import { createSignal, For } from "solid-js";
import type { MapMod } from "~/api";
import { Mod } from "~/pages/maps/mod-search/Mod";

type Props = {
  mods: MapMod[];
};

export function ModList(props: Props) {
  const [selectedMods, setSelectedMods] = createSignal<number[]>([]);

  const addOrRemoveMod = (id: number) => {
    setSelectedMods((prev) => {
      const index = prev.indexOf(id);
      if (index > -1) {
        return prev.toSpliced(index, 1);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div class={"col gap-2"}>
      <For each={props.mods}>
        {(mod) => {
          const isSelected = () => selectedMods().includes(mod.id);

          return (
            <Mod
              isSelected={isSelected}
              mod={mod}
              onClick={() => addOrRemoveMod(mod.id)}
            />
          );
        }}
      </For>
    </div>
  );
}
