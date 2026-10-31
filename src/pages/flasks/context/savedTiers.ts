import { modById } from "../data";
import type { FlaskWindow } from "./context";

export function withTierLists(window: FlaskWindow): FlaskWindow {
  const saved = Object.entries(window.mods as Record<string, number | number[]>);
  return { ...window, mods: Object.fromEntries(saved.map(([id, tiers]) => [id, Array.isArray(tiers) ? tiers : tiersFromCount(id, tiers)])) };
}

function tiersFromCount(modId: string, count: number): number[] {
  const total = modById.get(modId)?.tiers.length ?? 0;
  return count >= total ? [] : Array.from({ length: count }, (_, index) => index);
}
