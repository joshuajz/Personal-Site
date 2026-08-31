import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  calculateTfsaRoom,
  formatTfsaContributionInput,
  parseTfsaContributionInput,
  parseTfsaLimits,
} from "../src/lib/tfsa.ts";

const limitsFile = fileURLToPath(new URL("../src/data/tfsa-contribution-limits.md", import.meta.url));
const limitsMarkdown = await readFile(limitsFile, "utf8");
const limits = parseTfsaLimits(limitsMarkdown);

test("parses every annual limit from 2009 through 2026", () => {
  assert.equal(limits.length, 18);
  assert.deepEqual(limits[0], { year: 2009, amount: 5_000 });
  assert.deepEqual(limits.at(-1), { year: 2026, amount: 7_000 });
});

test("matches the CRA full lifetime limit for someone eligible since 2009", () => {
  const result = calculateTfsaRoom(1991, 0, limits);
  assert.equal(result.lifetimeRoom, 109_000);
  assert.equal(result.availableRoom, 109_000);
});

test("matches Ratehub and CalcCanada for a pre-2009 eligible person", () => {
  const result = calculateTfsaRoom(1990, 25_000, limits);
  assert.equal(result.eligibilityYear, 2009);
  assert.equal(result.availableRoom, 84_000);
});

test("matches LoonieCalc's 2010 eligibility and $50,000 contribution example", () => {
  const result = calculateTfsaRoom(1992, 50_000, limits);
  assert.equal(result.lifetimeRoom, 104_000);
  assert.equal(result.availableRoom, 54_000);
});

test("uses the full calendar year in which someone turns 18", () => {
  const result = calculateTfsaRoom(2008, 0, limits);
  assert.equal(result.eligibilityYear, 2026);
  assert.equal(result.availableRoom, 7_000);
  assert.equal(result.annualLimits.length, 1);
});

test("matches the CRA Moira example carried through 2026", () => {
  const result = calculateTfsaRoom(2005, 13_500, limits);
  assert.equal(result.lifetimeRoom, 27_500);
  assert.equal(result.availableRoom, 14_000);
});

test("calculates room for someone who turned 18 in 2018", () => {
  const result = calculateTfsaRoom(2000, 0, limits);
  assert.equal(result.lifetimeRoom, 57_000);
});

test("returns not eligible for someone who turns 18 after the latest limit year", () => {
  const result = calculateTfsaRoom(2009, 0, limits);
  assert.equal(result.status, "not-eligible");
  assert.equal(result.availableRoom, 0);
  assert.equal(result.eligibilityYear, 2027);
});

test("returns fully used when contributions equal accumulated room", () => {
  const result = calculateTfsaRoom(1991, 109_000, limits);
  assert.equal(result.status, "fully-used");
  assert.equal(result.availableRoom, 0);
});

test("flags a possible over-contribution and never shows negative available room", () => {
  const result = calculateTfsaRoom(1991, 110_250, limits);
  assert.equal(result.status, "over-contributed");
  assert.equal(result.availableRoom, 0);
  assert.equal(result.excessContribution, 1_250);
});

test("preserves cents in contributions and results", () => {
  const result = calculateTfsaRoom(2008, 1_234.56, limits);
  assert.equal(result.availableRoom, 5_765.44);
});

test("adds thousands separators to contribution input", () => {
  assert.equal(formatTfsaContributionInput("50000"), "50,000");
  assert.equal(formatTfsaContributionInput("1234567.89"), "1,234,567.89");
});

test("normalizes pasted currency characters and excess decimal places", () => {
  assert.equal(formatTfsaContributionInput("$ 12,345.678 CAD"), "12,345.67");
});

test("keeps an empty contribution field empty while editing", () => {
  assert.equal(formatTfsaContributionInput(""), "");
});

test("parses grouped contributions and treats an empty field as zero", () => {
  assert.equal(parseTfsaContributionInput("50,000.25"), 50_000.25);
  assert.equal(parseTfsaContributionInput(""), 0);
});

test("rejects a negative contribution", () => {
  assert.throws(() => calculateTfsaRoom(1991, -1, limits), /zero or greater/);
});

test("rejects a non-numeric contribution", () => {
  assert.throws(() => calculateTfsaRoom(1991, Number.NaN, limits), /zero or greater/);
});

test("rejects a fractional birth year", () => {
  assert.throws(() => calculateTfsaRoom(1991.5, 0, limits), /four-digit birth year/);
});

test("rejects a future birth year", () => {
  assert.throws(() => calculateTfsaRoom(2027, 0, limits), /later than 2026/);
});

test("rejects a Markdown table that omits 2009", () => {
  assert.throws(() => parseTfsaLimits("| 2010 | $5,000 |"), /begin in 2009/);
});

test("rejects a Markdown table with a missing year", () => {
  assert.throws(
    () => parseTfsaLimits("| 2009 | $5,000 |\n| 2011 | $5,000 |"),
    /include every year/,
  );
});

test("rejects a Markdown table with no contribution data", () => {
  assert.throws(() => parseTfsaLimits("# No data yet"), /No TFSA contribution limits/);
});
