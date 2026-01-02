import { type Accessor, createMemo, createSignal, useContext } from "solid-js";
import type { MapMod } from "~/api";
import { MapsContext } from "~/pages/maps/context/context";
import { ModSearch } from "./ModSearch";

type Props = {
  mods: Accessor<MapMod[]>;
};

export function PositiveModSearch({ mods }: Props) {
  const { store, updateStore } = useContext(MapsContext);
  const [includeT17] = createSignal(false);

  const filteredAndSortedMods = createMemo(() =>
    mods()
      .filter(({ rank }) => (includeT17() ? true : rank < 700))
      .toSorted((a, b) => a.rank - b.rank),
  );

  const positiveModsType = () => store.positiveModsType;

  return (
    <ModSearch
      model={"positiveMods"}
      mods={filteredAndSortedMods()}
      title={"Мне нужны эти модификаторы"}
    >
      <div class={"row gap-3 center"}>
        <div class={"row gap-3"}>
          <input
            checked={positiveModsType() === "none"}
            class={`checkbox checkbox-primary rounded-md`}
            onChange={() => updateStore("positiveModsType", "none")}
            type="checkbox"
          />
          <span>Все</span>
        </div>
        <div class={"row gap-3"}>
          <input
            checked={positiveModsType() === "any"}
            class={`checkbox checkbox-primary rounded-md`}
            onChange={() => updateStore("positiveModsType", "any")}
            type="checkbox"
          />
          <span>Любой</span>
        </div>
      </div>
    </ModSearch>
  );
}
