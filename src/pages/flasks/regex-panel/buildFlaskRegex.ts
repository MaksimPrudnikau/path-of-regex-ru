import type { FlasksStore } from "../context/context";
import type { Affix, FlaskData, FlaskMod } from "../data";

export const MAX_REGEX_LENGTH = 250;

type RegexInput = Pick<FlasksStore, "bases" | "mods" | "matchBoth">;

export function buildFlaskRegex(input: RegexInput, data: FlaskData): string {
  const bases = baseAlternatives(input, data);
  const prefixes = affixAlternatives(input, data, "prefix");
  const suffixes = affixAlternatives(input, data, "suffix");
  const affixTerms = input.matchBoth ? [prefixes, suffixes] : [[...prefixes, ...suffixes]];
  return [bases, ...affixTerms]
    .filter((alternatives) => alternatives.length > 0)
    .map((alternatives) => `"${alternatives.join("|")}"`)
    .join(" ");
}

export function tierAlternatives(mod: FlaskMod, tierCount: number): string[] {
  const names = [...new Set(mod.tiers.slice(0, tierCount).map((tier) => tier.regex))];
  const isAnyTier = tierCount >= mod.tiers.length;
  return isAnyTier && mod.regex !== null && mod.regex.length < names.join("|").length ? [mod.regex] : names;
}

function baseAlternatives(input: RegexInput, data: FlaskData): string[] {
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

function affixAlternatives(input: RegexInput, data: FlaskData, affix: Affix): string[] {
  const mods = data.mods.filter((mod) => mod.affix === affix && input.mods[mod.id] !== undefined);
  return [...new Set(mods.flatMap((mod) => tierAlternatives(mod, input.mods[mod.id])))];
}
