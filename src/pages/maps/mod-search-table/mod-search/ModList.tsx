import { type Accessor, For, useContext } from "solid-js";
import type { MapMod } from "~/api";
import { MapsProfileContext } from "~/pages/maps/context";
import { Mod } from "~/pages/maps/mod-search-table/mod-search/Mod";

type Props = {
  mods: Accessor<MapMod[]>;
  model: "negativeMods" | "positiveMods";
};

export function ModList({ mods, model }: Props) {
  const { currentProfile, updateProfile } = useContext(MapsProfileContext);

  const selectedMods = () => currentProfile()[model];

  const addOrRemoveMod = (mod: MapMod) => {
    updateProfile((prev) => {
      const list = prev[model];

      const index = list.findIndex((x) => x.id === mod.id);

      const newList =
        index > -1
          ? list.toSpliced(index, 1)
          : [...list, { id: mod.id, regex: mod.regex }];

      return { ...prev, [model]: newList };
    });
  };

  return (
    <div class={"col gap-2"}>
      <For each={mods()}>
        {(mod) => {
          const isSelected = () =>
            selectedMods()
              .map((x) => x.id)
              .includes(mod.id);

          return (
            <Mod isSelected={isSelected} mod={mod} onClick={() => addOrRemoveMod(mod)} />
          );
        }}
      </For>
    </div>
  );
}
