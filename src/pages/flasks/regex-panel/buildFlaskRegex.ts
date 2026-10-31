import type { FlaskWindow } from "../context/context";
import type { Affix, FlaskData, FlaskMod } from "../data";

export const MAX_REGEX_LENGTH = 250;

export type WindowInput = Pick<FlaskWindow, "bases" | "mods" | "matchBoth">;

export function buildFlaskRegex(input: WindowInput, data: FlaskData): string {
  return windowTerms(input, data)
    .map((alternatives) => `"${alternatives.join("|")}"`)
    .join(" ");
}

export function windowTerms(input: WindowInput, data: FlaskData): string[][] {
  const bases = baseAlternatives(input, data);
  const prefixes = affixAlternatives(input, data, "prefix");
  const suffixes = affixAlternatives(input, data, "suffix");
  const affixTerms = input.matchBoth ? [prefixes, suffixes] : [[...prefixes, ...suffixes]];
  return [bases, ...affixTerms].filter((alternatives) => alternatives.length > 0);
}

export function tierAlternatives(mod: FlaskMod, tiers: number[]): string[] {
  const chosen = tiers.length === 0 ? mod.tiers : mod.tiers.filter((_, index) => tiers.includes(index));
  const names = [...new Set(chosen.map((tier) => tier.regex))];
  const isAnyTier = chosen.length === mod.tiers.length;
  return isAnyTier && mod.regex !== null && mod.regex.length < names.join("|").length ? [mod.regex] : names;
}

function baseAlternatives(input: WindowInput, data: FlaskData): string[] {
  const selected = data.bases.filter((base) => input.bases.includes(base.id));
  const fullKinds = Object.entries(data.kinds).filter(
    ([kind, regex]) => regex !== null && data.bases.filter((base) => base.kind === kind).every((base) => input.bases.includes(base.id)),
  );
  const coveredKinds = new Set(fullKinds.map(([kind]) => kind));
  return [
    ...fullKinds.map(([, regex]) => regex as string),
    ...selected.filter((base) => !coveredKinds.has(base.kind)).map((base) => base.regex),
  ];
}

function affixAlternatives(input: WindowInput, data: FlaskData, affix: Affix): string[] {
  const mods = data.mods.filter((mod) => mod.affix === affix && input.mods[mod.id] !== undefined);
  return [...new Set(mods.flatMap((mod) => tierAlternatives(mod, input.mods[mod.id])))];
}
