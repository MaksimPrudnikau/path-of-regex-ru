import { For } from "solid-js";
import type { MapMod } from "~/api";

type Props = {
  mods: MapMod[];
};

export function ModList(props: Props) {
  return (
    <div class={"col gap-0"}>
      <For each={props.mods}>
        {(mod) => {
          return (
            <button
              class={
                "btn btn-ghost text-start p-2 text-wrap justify-start h-fit"
              }
              type={"button"}
            >
              {mod.name}
            </button>
          );
        }}
      </For>
    </div>
  );
}
