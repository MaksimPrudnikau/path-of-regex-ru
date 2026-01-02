import type { ParentProps } from "solid-js";
import { createStore } from "solid-js/store";
import { IncludeMapType, MapsContext, type MapsStore, } from "~/pages/maps/context/context";

export function MapContextProvider(props: ParentProps) {
  const [store, updateStore] = createStore<MapsStore>({
    includeCorruptedMapsType: IncludeMapType.Include,
    includeMapsType: IncludeMapType.Include,
    includeUnidentifiedMapsType: IncludeMapType.Include,
  });

  return (
    <MapsContext.Provider value={{ store, updateStore }}>
      {props.children}
    </MapsContext.Provider>
  );
}
