import { type Accessor, createMemo, useContext } from "solid-js";
import type { MapMod } from "~/api";
import { MapsProfileContext } from "~/pages/maps/context";
import { PositiveModsType } from "~/pages/maps/context/maps";
import { ModSearch } from "./mod-search/ModSearch";

type Props = {
  mods: Accessor<MapMod[]>;
};

export function PositiveModSearch({ mods }: Props) {
  const { currentProfile, updateProfile } = useContext(MapsProfileContext);

  const filteredAndSortedMods = createMemo(() =>
    mods().toSorted((a, b) => a.rank - b.rank),
  );

  const positiveModsType = () => currentProfile().positiveModsType;

  return (
    <ModSearch
      model={"positiveMods"}
      mods={filteredAndSortedMods}
      title={
        <>
          <span class={"font-bold uppercase text-primary"}>Включить </span>
          <span>эти модификаторы</span>
        </>
      }
    >
      <div class={"row gap-3 center"}>
        <div class={"row gap-3"}>
          <input
            checked={positiveModsType() === PositiveModsType.Any}
            class={`radio radio-primary rounded-md`}
            onChange={() => {
              updateProfile((prev) => ({
                ...prev,
                positiveModsType: PositiveModsType.Any,
              }));
            }}
            type="radio"
          />
          <span>Любой</span>
        </div>
        <div class={"row gap-3"}>
          <input
            checked={positiveModsType() === PositiveModsType.None}
            class={`radio radio-primary rounded-md`}
            onChange={() => {
              updateProfile((prev) => ({
                ...prev,
                positiveModsType: PositiveModsType.None,
              }));
            }}
            type="radio"
          />
          <span>Все</span>
        </div>
      </div>
    </ModSearch>
  );
}
