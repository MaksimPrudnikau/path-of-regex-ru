import type { MapsStore } from "~/pages/maps/context/context";

const MIN_MAP_LEVEL = 1;
const MAX_MAP_LEVEL = 17;

export function buildLevelRegex({ min, max }: MapsStore["level"]): string {
  if (!min && !max) {
    return "";
  }

  minMaxValidation(min, max);

  if (min && !max) {
    if (min < 10) {
      return `"ы: ([${min}-9]|1[0-${MAX_MAP_LEVEL % 10}])$"`;
    } else {
      return `"ы: (1[${min % 10}-${MAX_MAP_LEVEL % 10}])$"`;
    }
  }

  if (!min && max) {
    if (max < 10) {
      return `"ы: ([1-${max}])$"`;
    } else if (max >= 10 && max <= MAX_MAP_LEVEL) {
      return `"ы: ([1-9]|1[0-${max % 10}])$"`;
    }
  }

  min = min!;
  max = max!;

  if (min < 10 && max < 10) {
    return `"ы: ([${min}-${max}])$"`;
  }

  if (min >= 10 && max >= 10) {
    return `"ы: (1[${min % 10}-${max % 10}])$"`;
  }

  return `"ы: ([${min}-9]|1[0-${max % 10}])$"`;
}

function minMaxValidation(min: number | undefined, max: number | undefined) {
  if (!(min && max)) {
    return;
  }

  if (min) {
    validateRange(min, "min");
  }

  if (max) {
    validateRange(max, "max");
  }

  if (min > max) {
    throw new Error(
      "Минимальный уровень карты не может быть больше максимального",
    );
  }
}

function validateRange(range: number | undefined, type: "min" | "max") {
  if (!range) {
    return;
  }

  const rangeName = type === "min" ? "Минимальный" : "Максимальный";
  const lastWord = type === "min" ? "максимального" : "минимального";

  if (range < 0) {
    throw new Error(`${rangeName} уровень карты не может быть меньше 0`);
  }
  if (range < MIN_MAP_LEVEL) {
    throw new Error(
      `${rangeName} уровень карты не может быть меньше ${lastWord}`,
    );
  } else if (range > MAX_MAP_LEVEL) {
    throw new Error(
      `${rangeName} уровень карты не может быть больше ${MAX_MAP_LEVEL}`,
    );
  }
}
