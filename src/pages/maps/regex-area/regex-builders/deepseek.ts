import type { ModRange } from "~/pages/maps/context/context";

export type Config = {
  minAllowed?: number;
  maxAllowed?: number;
};

export function generateModRangeRegex(
  range: ModRange,
  config?: Config,
): string {
  let { min, max } = range;
  min ??= 1;
  max ??= 999;

  const effectiveMax = validateRage(min, max, config);

  return generateOptimizedNumberRange(min, effectiveMax, config?.maxAllowed);
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

  return effectiveMax;
}

/**
 * Генерирует оптимизированный regex с учетом максимального порога
 */
function generateOptimizedNumberRange(
  min: number,
  max: number,
  maxAllowed?: number,
): string {
  // Если диапазон равен максимальному допустимому, можно упростить regex
  if (maxAllowed && max === maxAllowed && min === 1) {
    return getOptimizedPatternForFullRange(maxAllowed);
  }

  // Если диапазон покрывает весь возможный спектр, но не с 1
  if (maxAllowed && max === maxAllowed) {
    return generateRangePatternWithUpperBound(min, maxAllowed);
  }

  // Стандартная генерация для частичного диапазона
  return generateStandardRangePattern(min, max);
}

/**
 * Возвращает оптимизированный паттерн для полного диапазона от 1 до maxAllowed
 */
function getOptimizedPatternForFullRange(maxAllowed: number): string {
  switch (maxAllowed) {
    case 17: // 1-17 (уровень карты)
      return "1[0-7]|[1-9]";
    case 20: // 1-20 (качество)
      return "1[0-9]|20|[1-9]";
    default:
      // Общий случай
      return generateStandardRangePattern(1, maxAllowed);
  }
}

/**
 * Генерирует паттерн с учетом верхней границы (например, 5-17)
 */
function generateRangePatternWithUpperBound(
  min: number,
  maxAllowed: number,
): string {
  const strMaxAllowed = String(maxAllowed);
  const length = strMaxAllowed.length;

  if (length === 1) {
    // Однозначное максимальное значение (например, 5-9)
    return `[${min}-${maxAllowed}]`;
  } else if (length === 2) {
    // Двузначное максимальное значение (например, 15-20)
    const firstDigitMax = Math.floor(maxAllowed / 10);
    const secondDigitMax = maxAllowed % 10;

    // Если min тоже двузначное
    if (min >= 10) {
      const firstDigitMin = Math.floor(min / 10);

      if (firstDigitMin === firstDigitMax) {
        // Одинаковые первые цифры (например, 15-19)
        return `${firstDigitMin}[${min % 10}-${secondDigitMax}]`;
      } else {
        // Разные первые цифры (например, 15-20)
        return `${firstDigitMin}[${min % 10}-9]|${firstDigitMax}[0-${secondDigitMax}]`;
      }
    } else {
      // min однозначное, max двузначное (например, 5-20)
      return `${generateRangeForSingleDigit(min, 9)}|${firstDigitMax}[0-${secondDigitMax}]`;
    }
  } else {
    // Трехзначное максимальное значение
    return generateStandardRangePattern(min, maxAllowed);
  }
}

/**
 * Вспомогательные функции
 */
function generateRangeForSingleDigit(min: number, max: number): string {
  return min === max ? `${min}` : `[${min}-${max}]`;
}

function generateStandardRangePattern(min: number, max: number): string {
  if (min === max) return String(min);

  const ranges = splitIntoRanges(min, max);
  const patterns = ranges.map(({ start, end }) => {
    if (start === end) return String(start);

    const startStr = String(start);
    const endStr = String(end);

    // Если числа разной длины
    if (startStr.length !== endStr.length) {
      return `${start}|${end}`;
    }

    // Генерация паттерна для одинаковой длины
    return generatePatternForSameLength(start, end);
  });

  return patterns.length === 1 ? patterns[0] : `${patterns.join("|")}`;
}

function generatePatternForSameLength(start: number, end: number): string {
  const startStr = String(start);
  const endStr = String(end);
  const patternParts: string[] = [];

  for (let i = 0; i < startStr.length; i++) {
    const startChar = startStr[i];
    const endChar = endStr[i];

    if (startChar === endChar) {
      patternParts.push(startChar);
    } else {
      patternParts.push(`[${startChar}-${endChar}]`);
    }
  }

  return patternParts.join("");
}

function splitIntoRanges(
  min: number,
  max: number,
): Array<{ start: number; end: number }> {
  const ranges: Array<{ start: number; end: number }> = [];
  let current = min;

  while (current <= max) {
    const nextBoundary = getNextBoundary(current, max);
    ranges.push({ end: nextBoundary, start: current });
    current = nextBoundary + 1;
  }

  return ranges;
}

function getNextBoundary(current: number, max: number): number {
  const str = String(current);

  if (str.length === 1) return Math.min(9, max);
  if (str.length === 2) return Math.min(99, max);
  return max;
}
