import toRegexRange from "to-regex-range";
import type { ModRange } from "~/pages/maps/context/context";

export type Config = {
  minAllowed?: number;
  maxAllowed?: number;
};

export function generateModRangeRegex(range: ModRange, config?: Config): string {
  let { min, max } = range;
  min ??= 1;
  max ??= 999;

  const { effectiveMin, effectiveMax } = validateRage(min, max, config);

  const regex = toRegexRange(effectiveMin, effectiveMax, {
    capture: true,
    shorthand: true,
  });

  const removeBrackets = regex.replaceAll("(", "").replaceAll(")", "");

  return `(${removeBrackets})`;
}

function validateRage(min: number, max: number, config: Config | undefined) {
  const minAllowed = config?.minAllowed;
  const maxAllowed = config?.maxAllowed;

  // Валидация
  if (min < 1) throw new Error("Минимальное значение не может быть меньше 1");
  if (minAllowed && min < minAllowed) {
    throw new Error(
      `Максимальное значение ${min} превышает максимально допустимое ${minAllowed}`,
    );
  }
  if (max < min)
    throw new Error("Максимальное значение не может быть меньше минимального");

  // Используем maxAllowed если он задан, иначе берем max
  const effectiveMax = maxAllowed ? Math.min(max, maxAllowed) : max;

  // Если min превышает maxAllowed
  if (maxAllowed && min > maxAllowed) {
    throw new Error(
      `Минимальное значение ${min} превышает максимально допустимое ${maxAllowed}`,
    );
  }

  return {
    effectiveMax,
    effectiveMin: minAllowed ?? min,
  };
}
