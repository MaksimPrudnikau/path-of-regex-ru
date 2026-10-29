import type { FlaskMod, FlaskTier } from "../data";

type Range = [low: number, high: number];

export function includedValues(mod: FlaskMod, tierCount: number): string {
  const index = varyingIndex(mod);
  const range = spanOf(mod.tiers.slice(0, tierCount).map((tier) => tierRanges(mod, tier)[index]));
  return `${formatRange(range)}${unitOf(mod)}`;
}

function varyingIndex(mod: FlaskMod): number {
  const ranges = mod.tiers.map((tier) => tierRanges(mod, tier));
  const index = ranges[0].findIndex((range, position) => ranges.some((tier) => tier[position]?.join() !== range.join()));
  return Math.max(index, 0);
}

function unitOf(mod: FlaskMod): string {
  const after = mod.text.split("#")[varyingIndex(mod) + 1] ?? "";
  return after.startsWith("%") ? "%" : "";
}

function tierRanges(mod: FlaskMod, tier: FlaskTier): Range[] {
  const lines = tier.lines.slice(0, mod.text.split("\n").length);
  return lines.flatMap((line) =>
    [...line.matchAll(/\((\d+(?:\.\d+)?)—(\d+(?:\.\d+)?)\)|\d+(?:\.\d+)?/g)].map(
      (match): Range => (match[1] === undefined ? [Number(match[0]), Number(match[0])] : [Number(match[1]), Number(match[2])]),
    ),
  );
}

function spanOf(ranges: Range[]): Range {
  return [Math.min(...ranges.map((range) => range[0])), Math.max(...ranges.map((range) => range[1]))];
}

function formatRange([low, high]: Range): string {
  return low === high ? `${low}` : `${low}-${high}`;
}
