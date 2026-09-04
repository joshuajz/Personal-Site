import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { goatCounterEndpoint, isBlogPath } from "../src/lib/goatcounter.ts";

const endpoint = "https://example.goatcounter.com/count";
const productionOrigin = "https://joshcowan.com";
const component = readFileSync(new URL("../src/components/GoatCounter.astro", import.meta.url), "utf8");
const loader = component.match(/<script\b[^>]*>([\s\S]*?)<\/script>/)?.[1];
if (!loader) throw new Error("GoatCounter loader script is missing");

function runLoader(pageUrl: string, alreadyLoaded = false) {
  const scripts: Array<{ dataset: Record<string, string>; async?: boolean; src?: string }> = [];
  const document = {
    querySelector: () => alreadyLoaded ? {} : null,
    createElement: (tag: string) => {
      assert.equal(tag, "script");
      return { dataset: {} };
    },
    head: { appendChild: (script: typeof scripts[number]) => scripts.push(script) },
  };
  runInNewContext(loader!, { endpoint, productionOrigin, document, window: { location: new URL(pageUrl) } });
  return scripts;
}

test("blank configuration disables GoatCounter", () => {
  for (const value of [undefined, "", "  "]) assert.equal(goatCounterEndpoint(value), undefined);
});

test("valid counting endpoints are trimmed and preserved", () => {
  assert.equal(goatCounterEndpoint(` ${endpoint} `), endpoint);
});

test("invalid endpoints fail clearly", () => {
  for (const value of ["not a URL", "http://example.goatcounter.com/count", "https://example.goatcounter.com/", `${endpoint}?secret=example`, `${endpoint}#hash`, "https://user:password@example.goatcounter.com/count"]) {
    assert.throws(() => goatCounterEndpoint(value), /PUBLIC_GOATCOUNTER_URL/);
  }
});

test("blog index, posts, and archive routes load one asynchronous tracker", () => {
  for (const path of ["/blog", "/blog/", "/blog/my-post/", "/blog/tags/astro/", "/blog/2026/"]) {
    assert.equal(isBlogPath(path), true);
    const scripts = runLoader(`${productionOrigin}${path}`);
    assert.equal(scripts.length, 1);
    assert.equal(scripts[0].dataset.goatcounter, endpoint);
    assert.equal(scripts[0].async, true);
    assert.equal(scripts[0].src, "https://gc.zgo.at/count.js");
  }
});

test("non-blog routes do not load the tracker", () => {
  for (const path of ["/", "/tools/", "/blogger/", "/blog-post/", "/rss.xml"]) {
    assert.equal(isBlogPath(path), false);
    assert.equal(runLoader(`${productionOrigin}${path}`).length, 0);
  }
});

test("local, preview, alternate-port, and lookalike origins do not load the tracker", () => {
  for (const origin of ["http://localhost:4321", "http://127.0.0.1:4321", "https://preview.example.com", "https://joshcowan.com.example.com", "http://joshcowan.com", "https://joshcowan.com:4321"]) {
    assert.equal(runLoader(`${origin}/blog/`).length, 0);
  }
});

test("an existing tracker is not loaded a second time", () => {
  assert.equal(runLoader(`${productionOrigin}/blog/`, true).length, 0);
});
