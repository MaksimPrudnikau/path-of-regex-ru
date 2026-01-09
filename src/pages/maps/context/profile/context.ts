import { type Accessor, createContext } from "solid-js";
import type { MapsStore } from "~/pages/maps/context/maps";

export type Profiles = Record<string, MapsStore>;

export type Context = {
  profiles: Profiles;
  currentProfileName: Accessor<string>;
  currentProfile: Accessor<MapsStore>;
  addProfile: (name: string, duplicateFrom?: string) => void;
  editProfile: (name: string) => void;
  removeProfile: () => void;
  setCurrentProfile: (name: string) => void;
  updateProfile: (setter: (prev: MapsStore) => MapsStore) => void;
};

export const MapsProfileContext = createContext<Context>({} as unknown as Context);
