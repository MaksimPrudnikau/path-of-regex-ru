import { createMemo, createSignal } from "solid-js";
import type { MapMod } from "~/api";
import { ModSearch } from "./ModSearch";

type Props = {
  mods: MapMod[];
};

export function PositiveModSearch({ mods }: Props) {
  const [includeT17] = createSignal(false);

  const filteredAndSortedMods = createMemo(() =>
    mods
      .filter(({ rank }) => (includeT17() ? true : rank < 700))
      .toSorted((a, b) => a.rank - b.rank),
  );

  return (
    <ModSearch
      mods={filteredAndSortedMods()}
      title={"Мне нужны эти модификаторы"}
    />
  );
}
