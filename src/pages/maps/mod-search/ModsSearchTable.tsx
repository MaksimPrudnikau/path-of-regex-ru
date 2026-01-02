import { type Accessor, createMemo, useContext } from "solid-js";
import type { MapMod } from "~/api";
import { MapsContext } from "~/pages/maps/context/context";
import { NegativeModSearch } from "./NegativeModSearch";
import { PositiveModSearch } from "./PositiveModSearch";

type Props = {
  mods: Accessor<MapMod[] | undefined>;
};

export function ModsSearchTable({ mods }: Props) {
  const { store } = useContext(MapsContext);

  const filteredMods = createMemo(() =>
    (mods() ?? []).filter(({ rank }) =>
      store.includeT17Maps ? true : rank < 700,
    ),
  );

  return (
    <div class={"w-full grid grid-cols-2 grid-rows-1 gap-10"}>
      <NegativeModSearch mods={filteredMods} />
      <PositiveModSearch mods={filteredMods} />
    </div>
  );
}
