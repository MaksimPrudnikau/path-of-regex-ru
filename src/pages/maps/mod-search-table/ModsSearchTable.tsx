import { type Accessor, createMemo, useContext } from "solid-js";
import type { MapMod } from "~/api";
import { MapsProfileContext } from "~/pages/maps/context";
import { NegativeModSearch } from "./NegativeModSearch";
import { PositiveModSearch } from "./PositiveModSearch";

type Props = {
  mods: Accessor<MapMod[]>;
};

export function ModsSearchTable({ mods }: Props) {
  const { currentProfile } = useContext(MapsProfileContext);

  const filteredMods = createMemo(() =>
    mods().filter((mod) => (currentProfile().includeT17 ? true : mod.rank < 700)),
  );

  return (
    <div class={"w-full grid grid-cols-2 grid-rows-1 gap-20"}>
      <NegativeModSearch mods={filteredMods} />
      <PositiveModSearch mods={filteredMods} />
    </div>
  );
}
