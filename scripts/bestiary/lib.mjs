import { readFileSync, writeFileSync } from "node:fs";

export const BESTIARY_FILE = new URL("../../data/bestiary.json", import.meta.url);
export const CORPUS_FILE = new URL("./data/poedb-names.json", import.meta.url);

const MIN_REGEX_LENGTH = 4;
const MIN_WORD_PART_LENGTH = 3;
const MAX_REPORTED_CONFLICTS = 3;

export function loadBestiary() {
  return JSON.parse(readFileSync(BESTIARY_FILE, "utf8"));
}

export function saveBestiary(bestiary) {
  writeFileSync(BESTIARY_FILE, `${JSON.stringify(bestiary, null, 1)}\n`);
}

export function loadCorpus() {
  return JSON.parse(readFileSync(CORPUS_FILE, "utf8"));
}

export function corpusNames(corpus, beasts) {
  return new Set([...beasts.map((beast) => beast.name), ...corpus.monsters, ...corpus.mods].map((name) => name.toLowerCase()));
}

export function shortestUniqueRegex(name, names) {
  const lower = name.toLowerCase();
  const others = [...names].filter((other) => other !== lower);

  for (let length = MIN_REGEX_LENGTH; length <= lower.length; length++) {
    for (let start = 0; start + length <= lower.length; start++) {
      const part = lower.slice(start, start + length);
      if (!hasShortWordPart(part) && others.every((other) => !other.includes(part))) {
        return escapeRegex(name.slice(start, start + length));
      }
    }
  }

  for (let length = MIN_REGEX_LENGTH; length <= lower.length; length++) {
    const part = lower.slice(0, length);
    if (!hasShortWordPart(part) && others.every((other) => !other.startsWith(part))) {
      return `^${escapeRegex(name.slice(0, length))}`;
    }
  }

  return `^${escapeRegex(name)}$`;
}

export function regexProblems(beast, names) {
  const sensitive = new RegExp(beast.regex, "m");
  const insensitive = new RegExp(beast.regex, "im");
  const problems = [];

  if (!sensitive.test(beast.name)) problems.push("не находит своё имя с учётом регистра");
  if (!insensitive.test(beast.name)) problems.push("не находит своё имя без учёта регистра");

  const lower = beast.name.toLowerCase();
  const conflicts = [...names].filter((other) => other !== lower && insensitive.test(other));
  if (conflicts.length > 0) {
    const shown = conflicts.slice(0, MAX_REPORTED_CONFLICTS).map((other) => `«${other}»`).join(", ");
    problems.push(`совпадает с чужими именами (${conflicts.length}): ${shown}`);
  }

  return problems;
}

function hasShortWordPart(part) {
  const words = part.split(/[\s,]+/);
  return words.length > 1 && words.some((word) => word.length < MIN_WORD_PART_LENGTH);
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
