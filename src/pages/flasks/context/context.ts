import { type Accessor, createContext } from "solid-js";
import type { ProfileControls } from "~/components/profile";
import type { FlaskKind } from "../data";

export type FlasksStore = {
  bases: string[];
  mods: Record<string, number>;
  matchBoth: boolean;
  kinds: FlaskKind[];
};

export type Context = ProfileControls & {
  state: Accessor<FlasksStore>;
  update: (patch: Partial<FlasksStore>) => void;
  regex: Accessor<string>;
  selectBases: (ids: string[], selected: boolean) => void;
  tierCountOf: (modId: string) => number | undefined;
  setTierCount: (modId: string, tierCount: number | undefined) => void;
  reset: () => void;
};

export const FlasksContext = createContext<Context>({} as unknown as Context);

export function initialFlasksState(): FlasksStore {
  return {
    bases: [],
    kinds: ["life", "mana", "utility"],
    matchBoth: true,
    mods: {},
  };
}
