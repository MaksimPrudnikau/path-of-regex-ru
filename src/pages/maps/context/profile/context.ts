import { type Accessor, createContext } from "solid-js";
import type { ProfileControls } from "~/components/profile";
import type { MapsStore } from "~/pages/maps/context/maps";

export type Profiles = Record<string, MapsStore>;

export type Context = ProfileControls & {
  profiles: Profiles;
  currentProfile: Accessor<MapsStore>;
  updateProfile: (setter: (prev: MapsStore) => MapsStore) => void;
};

export const MapsProfileContext = createContext<Context>({} as unknown as Context);
