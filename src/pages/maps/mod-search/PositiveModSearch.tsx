import { type Accessor, createMemo, useContext } from "solid-js";
import type { MapMod } from "~/api";
import { MapsContext, PositiveModsType } from "~/pages/maps/context/context";
import { ModSearch } from "./ModSearch";

type Props = {
  mods: Accessor<MapMod[]>;
};

export function PositiveModSearch({ mods }: Props) {
  const { store, updateStore } = useContext(MapsContext);

  const filteredAndSortedMods = createMemo(() =>
    mods().toSorted((a, b) => a.rank - b.rank),
  );

  const positiveModsType = () => store.positiveModsType;

  return (
    <ModSearch
      model={"positiveMods"}
      mods={filteredAndSortedMods}
      title={"Мне нужны эти модификаторы"}
    >
      <div class={"row gap-3 center"}>
        <div class={"row gap-3"}>
          <input
            checked={positiveModsType() === PositiveModsType.Any}
            class={`radio radio-primary rounded-md`}
            onChange={() =>
              updateStore("positiveModsType", PositiveModsType.Any)
            }
            type="radio"
          />
          <span>Любой</span>
        </div>
        <div class={"row gap-3"}>
          <input
            checked={positiveModsType() === PositiveModsType.None}
            class={`radio radio-primary rounded-md`}
            onChange={() =>
              updateStore("positiveModsType", PositiveModsType.None)
            }
            type="radio"
          />
          <span>Все</span>
        </div>
      </div>
    </ModSearch>
  );
}
