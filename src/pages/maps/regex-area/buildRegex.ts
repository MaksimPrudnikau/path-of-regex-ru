import type { MapsStore, ModRange } from "~/pages/maps/context/context";
import { type Config, generateModRangeRegex } from "./regex-builders/modRange.builder";

export const buildRegex = (store: MapsStore): string => {
  const {
    positiveMods,
    negativeMods,
    level,
    quality,
    packSize,
    rarity,
    moreCurrency,
    moreMaps,
    moreScarab,
  } = store;
  const positive = positiveMods.map((x) => x.regex).join("|");
  const negative = negativeMods.map((x) => x.regex).join("|");

  const resultArray: string[] = [];

  if (negativeMods.length > 0) {
    resultArray.push(`!${negative}`);
  }

  if (positiveMods.length > 0) {
    resultArray.push(positive);
  }

  const addIfHas = buildArrayUpdater(resultArray);

  addIfHas(level, "рты: ({0})", { maxAllowed: 17 });
  addIfHas(quality, "во: ({0})", { maxAllowed: 20 });
  addIfHas(packSize, "ров: ({0})");
  addIfHas(rarity, "тов: ({0})");
  addIfHas(moreCurrency, "юты: ({0})");
  addIfHas(moreMaps, "арт: ({0})");
  addIfHas(moreScarab, "арт: ({0})");

  return resultArray.map((reg) => `"${reg}$"`).join(" ");
};

function hasRange(range: ModRange): boolean {
  return !!range.min || !!range.max;
}

function buildArrayUpdater(array: string[]) {
  return (range: ModRange, format: string, config?: Config) => {
    if (!hasRange(range)) {
      return;
    }

    const regex = generateModRangeRegex(range, {
      maxAllowed: config?.maxAllowed,
      minAllowed: config?.minAllowed ?? 0,
    });
    const result = stringFormat(format, regex);

    array.push(result);
  };
}

function stringFormat(str: string, ...args: string[]) {
  return str.replace(/{(\d+)}/g, (_, index) => args[index] || "");
}
