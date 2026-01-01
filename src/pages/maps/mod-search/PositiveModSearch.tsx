import { createMemo } from "solid-js";
import type { MapMod } from "~/api";
import { ModSearch } from "./ModSearch";

type Props = {
  mods: MapMod[];
};

export function PositiveModSearch({ mods }: Props) {
  const sortedMods = createMemo(() => mods.toSorted((a, b) => a.rank - b.rank));

  return <ModSearch mods={sortedMods()} title={"Мне нужны эти модификаторы"} />;
}
