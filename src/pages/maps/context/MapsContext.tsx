import type { ParentProps } from "solid-js";
import { createStore } from "solid-js/store";
import { initialMapsContextState, MapsContext, type MapsStore, } from "~/pages/maps/context/context";

export function MapContextProvider(props: ParentProps) {
  const [store, updateStore] = createStore<MapsStore>(
    initialMapsContextState(),
  );

  return (
    <MapsContext.Provider value={{ store, updateStore }}>
      {props.children}
    </MapsContext.Provider>
  );
}
