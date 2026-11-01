export function priceSteps(prices: (number | undefined)[]): number[] {
  const known = prices.filter((price): price is number => price !== undefined);
  return [...new Set(known)].toSorted((a, b) => a - b);
}

export function indexFrom(steps: number[], minChaos: number | null): number {
  if (minChaos === null) return 0;
  const index = steps.findIndex((price) => price >= minChaos);
  return index === -1 ? Math.max(steps.length - 1, 0) : index;
}

export function indexTo(steps: number[], maxChaos: number | null): number {
  if (maxChaos === null) return Math.max(steps.length - 1, 0);
  return Math.max(steps.findLastIndex((price) => price <= maxChaos), 0);
}
