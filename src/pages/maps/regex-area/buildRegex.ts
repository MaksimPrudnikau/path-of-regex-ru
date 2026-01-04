import { IncludeMapType, type MapsStore, type ModRange, PositiveModsType, } from "~/pages/maps/context/context";
import { type Config, generateModRangeRegex, } from "./regex-builders/modRange.builder";

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

    includeNormalMaps,
    includeMagicMaps,
    includeRareMaps,
    includeMapsType,

    includeUnidentifiedMaps,
    includeUnidentifiedMapsType,

    includeCorruptedMaps,
    includeCorruptedMapsType,
    positiveModsType,
  } = store;
  const positive = positiveMods
    .map((x) => x.regex)
    .join(positiveModsType === PositiveModsType.Any ? "|" : `" "`);

  const negative = negativeMods.map((x) => x.regex).join("|");

  const resultArray: string[] = [];

  if (negativeMods.length > 0) {
    resultArray.push(`!${negative}`);
  }

  if (positiveMods.length > 0) {
    resultArray.push(positive);
  }

  const addIfHas = numberArrayUpdater(resultArray);

  addIfHas(level, "рты", { maxAllowed: 17 });
  addIfHas(quality, "во", { maxAllowed: 20 });
  addIfHas(packSize, "ров");
  addIfHas(rarity, "тов");
  addIfHas(moreCurrency, "юты");
  addIfHas(moreMaps, "арт");
  addIfHas(moreScarab, "арт");

  const includeMapsRegex = [
    [includeNormalMaps, "об"],
    [includeMagicMaps, "маг"],
    [includeRareMaps, "редк"],
  ]
    .filter((x) => x[0])
    .map(([_, reg]) => reg);

  const includeMaps =
    includeMapsRegex.length > 0 && includeMapsRegex.length < 3;

  const addCheckbox = checkboxArrayUpdated(resultArray);
  addCheckbox(includeMaps, includeMapsType, includeMapsRegex.join("|"));
  addCheckbox(includeUnidentifiedMaps, includeUnidentifiedMapsType, "ано");
  addCheckbox(includeCorruptedMaps, includeCorruptedMapsType, "ено");

  return resultArray.map((reg) => `"${reg}"`).join(" ");
};

function hasRange(range: ModRange): boolean {
  return !!range.min || !!range.max;
}

function numberArrayUpdater(array: string[]) {
  return (range: ModRange, prefix: string, config?: Config) => {
    if (!hasRange(range)) {
      return;
    }

    const regex = generateModRangeRegex(range, {
      maxAllowed: config?.maxAllowed,
      minAllowed: config?.minAllowed ?? 0,
    });
    const result = `${prefix}: (${regex})$`;

    array.push(result);
  };
}

function checkboxArrayUpdated(array: string[]) {
  return (map: boolean | undefined, type: IncludeMapType, regex: string) => {
    if (!map) {
      return;
    }

    array.push(type === IncludeMapType.Exclude ? `!${regex}` : regex);
  };
}
