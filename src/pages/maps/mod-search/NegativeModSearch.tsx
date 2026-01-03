import { type Accessor, createMemo } from "solid-js";
import type { MapMod } from "~/api";
import { ModSearch } from "./ModSearch";

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
      title={"Мне не нужны эти модификаторы"}
    />
  );
}
