import type { FlaskKind, FlaskMod } from "../data";
import type { AffixMatch } from "./regexLookup";

export function pickMods(choices: AffixMatch[][], baseKinds: ReadonlySet<FlaskKind>): Record<string, number[]> {
  const picked = new Map<FlaskMod, Set<number | null>>();

  for (const choice of choices) {
    for (const { mod, tier } of fitting(choice, baseKinds)) {
      picked.set(mod, (picked.get(mod) ?? new Set()).add(tier));
    }
  }

  return Object.fromEntries([...picked].map(([mod, tiers]) => [mod.id, tierList(mod, tiers)]));
}

function fitting(choice: AffixMatch[], baseKinds: ReadonlySet<FlaskKind>): AffixMatch[] {
  const suitable = choice.filter(({ mod }) => mod.kinds.some((kind) => baseKinds.has(kind)));

  return baseKinds.size === 0 || suitable.length === 0 ? choice : suitable;
}

function tierList(mod: FlaskMod, tiers: Set<number | null>): number[] {
  const indexes = [...tiers].filter((tier) => tier !== null).sort((a, b) => a - b);

  return tiers.has(null) || indexes.length >= mod.tiers.length ? [] : indexes;
}
