import type { ParentProps } from "solid-js";
import { createStore } from "solid-js/store";
import { MapsContext } from "~/pages/maps/context/context";

export function MapContextProvider(props: ParentProps) {
  const [store, updateStore] = createStore({
    includeT17: false,
  });

  return (
    <MapsContext.Provider value={{ store, updateStore }}>
      {props.children}
    </MapsContext.Provider>
  );
}
