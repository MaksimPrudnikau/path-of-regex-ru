import { type Accessor, createContext } from "solid-js";
import type { ProfileControls } from "~/components/profile";

export type FlaskWindow = {
  id: string;
  bases: string[];
  mods: Record<string, number[]>;
  matchBoth: boolean;
};

export type FlasksStore = {
  windows: FlaskWindow[];
};

export type Context = ProfileControls & {
  state: Accessor<FlasksStore>;
  searches: Accessor<string[]>;
  searchIndex: Accessor<number>;
  setSearchIndex: (index: number) => void;
  regex: Accessor<string>;
  updateWindow: (id: string, patch: Partial<FlaskWindow>) => void;
  selectBases: (id: string, baseIds: string[], selected: boolean) => void;
  addWindow: () => void;
  duplicateWindow: (id: string) => void;
  removeWindow: (id: string) => void;
  reset: () => void;
};

export const FIRST_WINDOW_ID = "first";

export const FlasksContext = createContext<Context>({} as unknown as Context);

export function initialFlasksState(): FlasksStore {
  return { windows: [{ ...emptyWindow(), id: FIRST_WINDOW_ID }] };
}

export function emptyWindow(): FlaskWindow {
  return { bases: [], id: crypto.randomUUID(), matchBoth: true, mods: {} };
}
