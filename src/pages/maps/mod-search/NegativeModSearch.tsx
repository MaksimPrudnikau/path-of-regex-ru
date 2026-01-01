import { createMemo } from "solid-js";
import type { MapMod } from "~/api";
import { ModSearch } from "./ModSearch";

type Props = {
  mods: MapMod[];
};

export function NegativeModSearch({ mods }: Props) {
  const negativeMods = createMemo(() =>
    mods.toSorted((a, b) => b.rank - a.rank),
  );

  return (
    <ModSearch mods={negativeMods()} title={"Мне не нужны эти модификаторы"} />
  );
}
