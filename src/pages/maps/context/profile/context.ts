import { type Accessor, createContext } from "solid-js";
import type { MapsStore } from "~/pages/maps/context/maps";

export type Profiles = Map<string, MapsStore | undefined>;

export type Context = {
  profiles: Accessor<Profiles>;
  currentProfile: Accessor<string>;
  addProfile: (name: string, duplicateFrom?: string) => void;
  updateProfile: (name: string) => void;
  removeProfile: () => void;
  setCurrentProfile: (name: string) => void;
};

export const MapsProfileContext = createContext<Context>({} as unknown as Context);
