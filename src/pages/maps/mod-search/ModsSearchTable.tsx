import { createMemo, useContext } from "solid-js";
import { MapsContext } from "~/pages/maps/MapsContextProvider";
import { NegativeModSearch } from "./NegativeModSearch";
import { PositiveModSearch } from "./PositiveModSearch";

export function ModsSearchTable() {
  const {
    store: { maps, includeT17 },
  } = useContext(MapsContext);

  const filteredMods = createMemo(() =>
    maps.filter(({ rank }) => (includeT17 ? true : rank < 700)),
  );

  return (
    <div class={"w-full grid grid-cols-2 grid-rows-1 gap-10"}>
      <NegativeModSearch mods={filteredMods()} />
      <PositiveModSearch mods={filteredMods()} />
    </div>
  );
}
