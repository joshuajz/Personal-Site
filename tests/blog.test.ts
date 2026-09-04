import assert from "node:assert/strict";
import test from "node:test";
import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import config from "../astro.config.mjs";
import { parsePostTitle, plainPostTitle } from "../src/lib/post-title.ts";

test("post titles distinguish code spans from literal text", () => {
  assert.deepEqual(parsePostTitle("`SASS` Embedded"), [
    { text: "SASS", code: true },
    { text: " Embedded", code: false },
  ]);
  assert.equal(plainPostTitle("`` `SASS` `` & `a`"), "`SASS` & a");
  assert.equal(plainPostTitle("An unmatched `tick"), "An unmatched `tick");
  assert.deepEqual(parsePostTitle("<b>literal</b> & `a < b`"), [
    { text: "<b>literal</b> & ", code: false },
    { text: "a < b", code: true },
  ]);
});

test("footnotes return to each occurrence and keep external sources separate", async () => {
  const processor = await createMarkdownProcessor(config.markdown.processor.options);
  const { code } = await processor.render(
    "One[^validation], twice[^validation].\n\n[^validation]: [Source](https://example.com).",
  );
  const ids = new Set([...code.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  const backlinks = [...code.matchAll(/<a\b[^>]*data-footnote-backref[^>]*>/g)];
  assert.equal(backlinks.length, 2);
  for (const [link] of backlinks) {
    const target = link.match(/href="#([^"]+)"/)?.[1];
    assert.ok(target && ids.has(target), `Missing footnote return target: ${target}`);
    assert.doesNotMatch(link, /target="_blank"/);
  }
  assert.match(code, /href="https:\/\/example.com" target="_blank" rel="noopener noreferrer"/);
});
