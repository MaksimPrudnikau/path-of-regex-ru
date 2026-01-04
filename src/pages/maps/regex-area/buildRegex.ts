import type { MapsStore } from "~/pages/maps/context/context";
import { buildLevelRegex } from "./regex-builders/level";

export const buildRegex = (store: MapsStore): string => {
  const { positiveMods, negativeMods, level } = store;
  const positive = positiveMods.map((x) => x.regex).join("|");
  const negative = negativeMods.map((x) => x.regex).join("|");

  const resultArray: string[] = [];

  if (negativeMods.length > 0) {
    resultArray.push(`"!${negative}"`);
  }

  if (positiveMods.length > 0) {
    resultArray.push(`"${positive}"`);
  }

  if (level.min || store.level.max) {
    resultArray.push(buildLevelRegex(level));
  }

  return resultArray.join(" ");
};
