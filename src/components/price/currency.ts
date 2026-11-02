import { formatChaos } from "~/lib/prices";

export type Currency = "chaos" | "divine";

export const CURRENCIES: Record<Currency, { label: string; icon: string }> = {
  chaos: { icon: "/icons/chaos.png", label: "Хаос" },
  divine: { icon: "/icons/divine.png", label: "Диван" },
};

export function formatPrice(chaos: number, currency: Currency, chaosPerUnit: number): string {
  return currency === "chaos" ? formatChaos(chaos) : formatDivine(chaos / chaosPerUnit);
}

export function toUnit(chaos: number, chaosPerUnit: number): number {
  return Number((chaos / chaosPerUnit).toFixed(2));
}

function formatDivine(price: number): string {
  if (price >= 10) return Math.round(price).toString();
  if (price >= 1) return price.toFixed(1);
  return price >= 0.01 ? price.toFixed(2) : "<0.01";
}
