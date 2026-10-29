import { type Accessor, createContext } from "solid-js";
import type { FlaskWindow } from "./context";

export type WindowContext = {
  state: Accessor<FlaskWindow>;
  update: (patch: Partial<FlaskWindow>) => void;
  selectBases: (ids: string[], selected: boolean) => void;
  tierCountOf: (modId: string) => number | undefined;
  setTierCount: (modId: string, tierCount: number | undefined) => void;
  replaceMod: (oldId: string, newId: string, tierCount: number) => void;
};

export const FlaskWindowContext = createContext<WindowContext>({} as unknown as WindowContext);
