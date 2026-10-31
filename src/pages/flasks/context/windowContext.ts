import { type Accessor, createContext } from "solid-js";
import type { FlaskWindow } from "./context";

export type WindowContext = {
  state: Accessor<FlaskWindow>;
  update: (patch: Partial<FlaskWindow>) => void;
  selectBases: (ids: string[], selected: boolean) => void;
  tiersOf: (modId: string) => number[] | undefined;
  setTiers: (modId: string, tiers: number[] | undefined) => void;
  replaceMod: (oldId: string, newId: string) => void;
};

export const FlaskWindowContext = createContext<WindowContext>({} as unknown as WindowContext);
