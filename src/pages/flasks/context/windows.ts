import type { FlaskWindow } from "./context";

export function withSelectedBases(windows: FlaskWindow[], id: string, baseIds: string[], selected: boolean): FlaskWindow[] {
  const index = windows.findIndex((window) => window.id === id);
  const target = windows[index];
  if (target === undefined) return windows;
  const bases = selected ? [...new Set([...target.bases, ...baseIds])] : target.bases.filter((baseId) => !baseIds.includes(baseId));
  return windows.with(index, { ...target, bases });
}

export function duplicated(windows: FlaskWindow[], id: string): FlaskWindow[] {
  const index = windows.findIndex((window) => window.id === id);
  if (index === -1) return windows;
  const source = windows[index];
  return windows.toSpliced(index + 1, 0, { ...source, bases: [...source.bases], id: crypto.randomUUID(), mods: copiedMods(source.mods) });
}

function copiedMods(mods: FlaskWindow["mods"]): FlaskWindow["mods"] {
  return Object.fromEntries(Object.entries(mods).map(([id, tiers]) => [id, [...tiers]]));
}
