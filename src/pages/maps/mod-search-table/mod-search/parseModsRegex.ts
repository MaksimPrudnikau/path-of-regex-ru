import { type MapMod, mapMods } from "~/api";
import { PositiveModsType } from "~/pages/maps/context/maps";

export type ParsedMods = {
  negativeMods: Array<Pick<MapMod, "id" | "regex">>;
  positiveMods: Array<Pick<MapMod, "id" | "regex">>;
  positiveModsType: PositiveModsType;
};

export function parseModsRegex(text: string): ParsedMods | undefined {
  const byRegex = new Map<string, MapMod>();
  for (const mod of mapMods) {
    if (!byRegex.has(mod.regex)) {
      byRegex.set(mod.regex, mod);
    }
  }

  const negativeMods: ParsedMods["negativeMods"] = [];
  const positiveMods: ParsedMods["positiveMods"] = [];
  let positiveTerms = 0;

  for (const term of splitTerms(text)) {
    const isNegative = term.startsWith("!");
    const found = (isNegative ? term.slice(1) : term)
      .split("|")
      .map((part) => byRegex.get(part))
      .filter((mod) => mod !== undefined)
      .map(({ id, regex }) => ({ id, regex }));

    if (found.length === 0) {
      continue;
    }

    if (isNegative) {
      negativeMods.push(...found);
    } else {
      positiveMods.push(...found);
      positiveTerms++;
    }
  }

  if (negativeMods.length + positiveMods.length === 0) {
    return undefined;
  }

  return {
    negativeMods: uniqueById(negativeMods),
    positiveMods: uniqueById(positiveMods),
    positiveModsType: positiveTerms > 1 ? PositiveModsType.None : PositiveModsType.Any,
  };
}

function splitTerms(text: string): string[] {
  const quoted = [...text.matchAll(/"([^"]*)"/g)].map((match) => match[1]);

  return quoted.length > 0 ? quoted : [text.trim()];
}

function uniqueById<T extends { id: number }>(list: T[]): T[] {
  return list.filter((item, index) => list.findIndex((x) => x.id === item.id) === index);
}
