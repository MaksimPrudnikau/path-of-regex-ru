import { readFileSync, writeFileSync } from "node:fs";

export const FLASKS_FILE = new URL("../../data/flasks.json", import.meta.url);
export const CORPUS_FILE = new URL("./data/poedb-flask-texts.json", import.meta.url);

export const SERVICE_LINES = [
  "Щёлкните ПКМ, чтобы выпить. Содержит заряды только когда висит на поясе. Пополняется по мере убийства монстров.",
  "Класс предмета: Флаконы жизни",
  "Класс предмета: Флаконы маны",
  "Класс предмета: Особые флаконы",
  "Редкость: Обычный",
  "Редкость: Волшебный",
  "Редкость: Уникальный",
  "Качество: +20% (augmented)",
  "Уровень предмета: 84",
  "Осквернено",
];

const MIN_REGEX_LENGTH = 4;
const MIN_WORD_PART_LENGTH = 3;
const MAX_REPORTED_CONFLICTS = 3;

export function loadFlasks() {
  return JSON.parse(readFileSync(FLASKS_FILE, "utf8"));
}

export function saveFlasks(flasks) {
  writeFileSync(FLASKS_FILE, `${JSON.stringify(flasks, null, 1)}\n`);
}

export function loadCorpus() {
  return JSON.parse(readFileSync(CORPUS_FILE, "utf8"));
}

export function skeleton(line) {
  return line.replace(/\(\d+(?:\.\d+)?—\d+(?:\.\d+)?\)|\d+(?:\.\d+)?/g, "#");
}

export function baseOwner(base) {
  return `base:${base.id}`;
}

export function kindOwner(kind) {
  return `kind:${kind}`;
}

export function modOwner(mod) {
  return `mod:${mod.id}`;
}

export function tierOwner(tier) {
  return `tier:${tier.name}`;
}

export function itemLines(corpus, flasks) {
  const textOwners = new Map([
    ...flasks.bases.map((base) => [base.name, [baseOwner(base), kindOwner(base.kind)]]),
    ...flasks.mods.flatMap((mod) => mod.tiers.flatMap((tier) => tier.lines.map((text) => [text, [modOwner(mod)]]))),
  ]);
  const tierNames = new Set(flasks.mods.flatMap((mod) => mod.tiers.map((tier) => tier.name)));
  const lines = [...corpus.texts, ...SERVICE_LINES]
    .filter((text) => !tierNames.has(text))
    .map((text) => line(text, ...(textOwners.get(text) ?? [])));
  for (const mod of flasks.mods) {
    for (const tier of mod.tiers) lines.push(...tier.lines.map((text) => line(text, modOwner(mod))));
  }
  for (const base of flasks.bases) {
    lines.push(line(base.name, baseOwner(base), kindOwner(base.kind)));
    for (const mod of flasks.mods.filter((mod) => mod.kinds.includes(base.kind))) {
      for (const tier of mod.tiers) {
        const name = mod.affix === "prefix" ? `${tier.name} ${base.name}` : `${base.name} ${tier.name}`;
        lines.push(line(name, baseOwner(base), kindOwner(base.kind), tierOwner(tier)));
      }
    }
  }
  return lines;
}

export function baseRegex(base, lines) {
  return shortestRegex(substrings(base.name), baseOwner(base), lines);
}

export function kindRegex(kind, bases, lines) {
  const names = bases.filter((base) => base.kind === kind).map((base) => base.name);
  return shortestRegex(names.flatMap(substrings), kindOwner(kind), lines);
}

export function modRegex(mod, lines) {
  return shortestRegex(mod.text.split("\n").flatMap(substrings), modOwner(mod), lines);
}

export function tierRegex(mod, tier, lines) {
  const owner = tierOwner(tier);
  const others = lines.filter((entry) => !entry.owners.includes(owner));
  const candidates = mod.affix === "prefix" ? prefixCandidates(tier.name, others) : suffixCandidates(tier.name, others);
  return shortestRegex([...substrings(tier.name), ...candidates], owner, lines);
}

export function regexProblems(regex, owner, lines) {
  const problems = [];
  for (const flags of ["m", "im"]) {
    const re = new RegExp(regex, flags);
    const missed = lines.filter((entry) => entry.owners.includes(owner) && !re.test(entry.padded));
    if (missed.length > 0) problems.push(`не находит «${missed[0].text}» (${flags === "m" ? "с регистром" : "без регистра"})`);
  }
  const insensitive = new RegExp(regex, "im");
  const conflicts = lines.filter((entry) => !entry.owners.includes(owner) && insensitive.test(entry.padded));
  if (conflicts.length > 0) {
    const shown = conflicts.slice(0, MAX_REPORTED_CONFLICTS).map((entry) => `«${entry.text}»`).join(", ");
    problems.push(`совпадает с чужим текстом (${conflicts.length}): ${shown}`);
  }
  return problems;
}

function line(text, ...owners) {
  const padded = ` ${text} `;
  return { lower: padded.toLowerCase(), owners, padded, text };
}

function shortestRegex(candidates, owner, lines) {
  const own = lines.filter((entry) => entry.owners.includes(owner));
  const others = lines.filter((entry) => !entry.owners.includes(owner));
  const sorted = [...new Set(candidates)]
    .filter((regex) => regex.length >= MIN_REGEX_LENGTH && !hasShortWordPart(regex))
    .sort((a, b) => a.length - b.length);
  return sorted.find((regex) => isExact(regex, own, others)) ?? null;
}

function isExact(regex, own, others) {
  if (/^[а-яё -]+$/.test(regex)) {
    return own.every((entry) => entry.lower.includes(regex)) && others.every((entry) => !entry.lower.includes(regex));
  }
  const sensitive = new RegExp(regex, "m");
  const insensitive = new RegExp(regex, "im");
  return own.every((entry) => sensitive.test(entry.padded)) && others.every((entry) => !insensitive.test(entry.padded));
}

function hasShortWordPart(regex) {
  const words = regex.replace(/^\(\^\|\[\^[^\]]+\]\)|^\[\^[^\]]+\] /, "").trim().split(/\s+/);
  return words.length > 1 && words.some((word) => word.length < MIN_WORD_PART_LENGTH);
}

function prefixCandidates(name, others) {
  const wordStarts = heads(name).flatMap((head) => {
    const before = charsBefore(head.toLowerCase(), others);
    if (before.includes(" ")) return [];
    return before.length === 0 ? [head] : [`(^|[^${before.join("")}])${head}`];
  });
  const beforeBase = tails(name).map((tail) => `${tail} [^ф]`);
  return [...wordStarts, ...beforeBase];
}

function suffixCandidates(name, others) {
  return heads(name).flatMap((head) => {
    const before = charsBefore(` ${head}`, others);
    return before.length === 0 ? [` ${head}`] : [`[^${before.join("")}] ${head}`];
  });
}

function charsBefore(part, others) {
  const chars = others.flatMap((entry) => entry.lower.split(part).slice(0, -1).map((chunk) => chunk.at(-1) ?? ""));
  return [...new Set(chars)].sort((a, b) => (a === "-") - (b === "-"));
}

function heads(text) {
  return [...text].map((_, index) => text.slice(0, index + 1));
}

function tails(text) {
  return [...text].map((_, index) => text.slice(index));
}

function substrings(text) {
  return text
    .split(/[^а-яё -]+/i)
    .flatMap((part) => [...part].flatMap((_, start) => [...part].map((__, end) => part.slice(start, end + 1))))
    .filter((part) => part === part.toLowerCase() && part.trim() === part && part.length > 0);
}
