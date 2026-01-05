import { type Accessor, createContext } from "solid-js";
import type { MapsStore } from "~/pages/maps/context/maps";

export type Profiles = Map<string, MapsStore | undefined>;

export type Context = {
  profiles: Accessor<Profiles>;
  currentProfile: Accessor<string>;
  addProfile: (name: string, profile: MapsStore) => void;
  updateProfile: (name: string, config: { name: string }) => void;
  removeProfile: (name: string) => void;
  setCurrentProfile: (name: string) => void;
};

export const MapsProfileContext = createContext<Context>({} as unknown as Context);
