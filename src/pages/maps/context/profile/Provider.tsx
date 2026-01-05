import { createSignal, type ParentProps } from "solid-js";
import type { MapsStore } from "~/pages/maps/context/maps";
import { MapsProfileContext } from "~/pages/maps/context/profile/context";

export function ProfileContextProvider(props: ParentProps) {
  const [profiles] = createSignal<Record<string, MapsStore>[]>([]);

  return (
    <MapsProfileContext.Provider value={{ profiles }}>
      {props.children}
    </MapsProfileContext.Provider>
  );
}
