import { readFileSync, writeFileSync } from "node:fs";
import { shortestUniqueRegex } from "../bestiary/lib.mjs";

export { regexProblems, shortestUniqueRegex } from "../bestiary/lib.mjs";

export const FRAGMENTS_FILE = new URL("../../data/fragments.json", import.meta.url);

export function loadFragments() {
  return JSON.parse(readFileSync(FRAGMENTS_FILE, "utf8"));
}

export function saveFragments(fragments) {
  writeFileSync(FRAGMENTS_FILE, `${JSON.stringify(fragments, null, 1)}\n`);
}

export function itemNames(items) {
  return new Set(items.map((item) => item.name.toLowerCase()));
}

export function assignRegexes(items) {
  const names = itemNames(items);
  for (const item of items) item.regex = shortestUniqueRegex(item.name, names);
}
