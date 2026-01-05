import { type Accessor, createContext } from "solid-js";
import type { MapsStore } from "~/pages/maps/context/maps";

export type Context = {
  profiles: Accessor<Record<string, MapsStore>[]>;
};

export const MapsProfileContext = createContext<Context>({} as unknown as Context);
