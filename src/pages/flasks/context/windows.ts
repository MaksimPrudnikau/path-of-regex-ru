import { flaskData } from "../data";
import { emptyWindow, type FlaskWindow } from "./context";

export function withSelectedBases(windows: FlaskWindow[], id: string, baseIds: string[], selected: boolean): FlaskWindow[] {
  const index = windows.findIndex((window) => window.id === id);
  const target = windows[index];
  if (target === undefined) return windows;
  if (!selected) return windows.with(index, { ...target, bases: target.bases.filter((baseId) => !baseIds.includes(baseId)) });

  const kind = kindOf(baseIds[0]);
  const ownKind = target.bases.length > 0 ? kindOf(target.bases[0]) : kind;
  if (ownKind === kind) return windows.with(index, { ...target, bases: [...new Set([...target.bases, ...baseIds])] });

  const sameKind = windows.findIndex((window) => window.bases.length > 0 && kindOf(window.bases[0]) === kind);
  if (sameKind !== -1) {
    const other = windows[sameKind];
    return windows.with(sameKind, { ...other, bases: [...new Set([...other.bases, ...baseIds])] });
  }
  return windows.toSpliced(index + 1, 0, { ...emptyWindow(), bases: baseIds });
}

export function duplicated(windows: FlaskWindow[], id: string): FlaskWindow[] {
  const index = windows.findIndex((window) => window.id === id);
  if (index === -1) return windows;
  const source = windows[index];
  return windows.toSpliced(index + 1, 0, { ...source, bases: [...source.bases], id: crypto.randomUUID(), mods: { ...source.mods } });
}

function kindOf(baseId: string) {
  return flaskData.bases.find((base) => base.id === baseId)?.kind;
}
