import { For, useContext } from "solid-js";
import type { MapMod } from "~/api";
import { MapsContext } from "~/pages/maps/context/context";
import { Mod } from "~/pages/maps/mod-search-table/mod-search/Mod";

type Props = {
  mods: MapMod[];
  model: "negativeMods" | "positiveMods";
};

export function ModList(props: Props) {
  const { store, updateStore } = useContext(MapsContext);

  const selectedMods = () => store[props.model];

  const addOrRemoveMod = (mod: MapMod) => {
    updateStore(props.model, (prev): Pick<MapMod, "id" | "regex">[] => {
      const index = prev.findIndex((x) => x.id === mod.id);

      return index > -1
        ? prev.toSpliced(index, 1)
        : [...prev, { id: mod.id, regex: mod.regex }];
    });
  };

  return (
    <div class={"col gap-2"}>
      <For each={props.mods}>
        {(mod) => {
          const isSelected = () =>
            selectedMods()
              .map((x) => x.id)
              .includes(mod.id);

          return (
            <Mod
              isSelected={isSelected}
              mod={mod}
              onClick={() => addOrRemoveMod(mod)}
            />
          );
        }}
      </For>
    </div>
  );
}
