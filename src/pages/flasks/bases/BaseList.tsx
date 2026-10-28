import { createMemo, For, useContext } from "solid-js";
import { FlasksContext } from "../context";
import { flaskData } from "../data";
import { BaseGroup } from "./BaseGroup";
import { KindFilter } from "./KindFilter";

export function BaseList() {
  const { state } = useContext(FlasksContext);
  const kinds = createMemo(() => (["life", "mana", "utility"] as const).filter((kind) => state().kinds.includes(kind)));

  return (
    <section class="card bg-base-200">
      <div class="card-body gap-4 p-5">
        <div>
          <h3 class="text-lg">Базы</h3>
          <p class="text-sm text-base-content/60">Если базы не выбраны, подойдёт любая. Рядом с названием указан уровень, с которого база выпадает</p>
        </div>
        <KindFilter />
        <For each={kinds()}>
          {(kind) => <BaseGroup bases={flaskData.bases.filter((base) => base.kind === kind)} kind={kind} />}
        </For>
      </div>
    </section>
  );
}
