import { type Accessor, createMemo } from "solid-js";
import type { MapMod } from "~/api";
import { ModSearch } from "./mod-search/ModSearch";

type Props = {
  mods: Accessor<MapMod[]>;
};

export function NegativeModSearch({ mods }: Props) {
  const sortedMods = createMemo(() =>
    mods().toSorted((a, b) => b.rank - a.rank),
  );

  return (
    <ModSearch
      model={"negativeMods"}
      mods={sortedMods}
      title={
        <>
          <span class={"font-bold uppercase text-red-500/80"}>исключить </span>
          <span>эти модификаторы</span>
        </>
      }
    />
  );
}
