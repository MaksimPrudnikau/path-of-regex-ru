import type { FlaskData, FlaskMod } from "../data";

export type AffixMatch = { mod: FlaskMod; tier: number | null };

export type RegexLookup = {
  baseIds: Map<string, string[]>;
  affixes: Map<string, AffixMatch[]>;
};

export function createRegexLookup(data: FlaskData): RegexLookup {
  const baseIds = new Map<string, string[]>();
  const affixes = new Map<string, AffixMatch[]>();

  for (const base of data.bases) {
    append(baseIds, base.regex, base.id);
  }
  for (const [kind, regex] of Object.entries(data.kinds)) {
    if (regex === null) continue;
    for (const base of data.bases.filter((candidate) => candidate.kind === kind)) {
      append(baseIds, regex, base.id);
    }
  }
  for (const mod of data.mods) {
    if (mod.regex !== null) append(affixes, mod.regex, { mod, tier: null });
    mod.tiers.forEach((tier, index) => append(affixes, tier.regex, { mod, tier: index }));
  }

  return { affixes, baseIds };
}

function append<T>(map: Map<string, T[]>, key: string, value: T) {
  map.set(key, [...(map.get(key) ?? []), value]);
}
