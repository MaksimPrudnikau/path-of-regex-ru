import { readFileSync, writeFileSync } from "node:fs";
import { shortestUniqueRegex } from "../bestiary/lib.mjs";

export { shortestUniqueRegex } from "../bestiary/lib.mjs";

export const FRAGMENTS_FILE = new URL("../../data/fragments.json", import.meta.url);
export const TEXTS_FILE = new URL("./data/poedb-item-texts.json", import.meta.url);

const MAX_REPORTED_CONFLICTS = 3;

export function loadFragments() {
  return JSON.parse(readFileSync(FRAGMENTS_FILE, "utf8"));
}

export function saveFragments(fragments) {
  writeFileSync(FRAGMENTS_FILE, `${JSON.stringify(fragments, null, 1)}\n`);
}

export function loadTexts() {
  return JSON.parse(readFileSync(TEXTS_FILE, "utf8"));
}

export function saveTexts(texts) {
  writeFileSync(TEXTS_FILE, `${JSON.stringify(texts, null, 1)}\n`);
}

export function fullText(item, texts) {
  return [item.name, ...(texts[item.id] ?? [])].join("\n").toLowerCase();
}

export function uniqueRegexFor(item, items, texts) {
  const others = new Set(items.filter((other) => other.id !== item.id).map((other) => fullText(other, texts)));
  others.add(item.name.toLowerCase());
  return shortestUniqueRegex(item.name, others);
}

export function assignRegexes(items, texts) {
  for (const item of items) item.regex = uniqueRegexFor(item, items, texts);
}

export function regexProblems(item, items, texts) {
  const insensitive = new RegExp(item.regex, "im");
  const problems = [];
  if (!new RegExp(item.regex, "m").test(item.name)) problems.push("не находит своё имя с учётом регистра");
  if (!insensitive.test(item.name)) problems.push("не находит своё имя без учёта регистра");

  const conflicts = items.filter((other) => other.id !== item.id && insensitive.test(fullText(other, texts)));
  if (conflicts.length > 0) {
    const shown = conflicts.slice(0, MAX_REPORTED_CONFLICTS).map((other) => `«${other.name}»`).join(", ");
    problems.push(`совпадает с текстом чужих предметов (${conflicts.length}): ${shown}`);
  }
  return problems;
}
