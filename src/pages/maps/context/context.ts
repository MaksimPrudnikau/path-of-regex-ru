import { createContext } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";

type Store = {
  includeT17: boolean;
};

type Context = {
  store: Store;
  updateStore: SetStoreFunction<Store>;
};

export const MapsContext = createContext<Context>({} as unknown as Context);
