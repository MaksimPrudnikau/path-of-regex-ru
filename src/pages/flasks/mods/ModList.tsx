import { createMemo, For, Show, useContext } from "solid-js";
import { FlasksContext } from "../context";
import { type Affix, flaskData } from "../data";
import { ModRow } from "./ModRow";

type Props = {
  affix: Affix;
};

export function ModList(props: Props) {
  const { state, update } = useContext(FlasksContext);
  const mods = createMemo(() =>
    flaskData.mods.filter((mod) => mod.affix === props.affix && mod.kinds.some((kind) => state().kinds.includes(kind))),
  );
  const selectedIds = createMemo(() => mods().filter((mod) => state().mods[mod.id] !== undefined).map((mod) => mod.id));

  const clearSelected = () =>
    update({ mods: Object.fromEntries(Object.entries(state().mods).filter(([id]) => !selectedIds().includes(id))) });

  return (
    <section class="col gap-2">
      <div class="flex items-center gap-2">
        <h3 class="text-xl">{props.affix === "prefix" ? "Префиксы" : "Суффиксы"}</h3>
        <Show when={selectedIds().length > 0}>
          <span class="badge badge-primary">{selectedIds().length}</span>
          <button class="btn btn-ghost btn-xs" onClick={clearSelected} type="button">
            Снять все
          </button>
        </Show>
      </div>
      <For each={mods()} fallback={<p class="text-base-content/60">Выберите вид флаконов выше</p>}>
        {(mod) => <ModRow mod={mod} />}
      </For>
    </section>
  );
}
