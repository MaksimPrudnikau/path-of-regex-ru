import { createMemo, For, useContext } from "solid-js";
import { FlasksContext } from "../context";
import { type FlaskBase, type FlaskKind, KIND_LABELS } from "../data";

type Props = {
  kind: FlaskKind;
  bases: FlaskBase[];
};

export function BaseGroup(props: Props) {
  const { selectBases, state } = useContext(FlasksContext);
  const ids = createMemo(() => props.bases.map((base) => base.id));
  const isSelected = (id: string) => state().bases.includes(id);
  const isAllSelected = createMemo(() => ids().every(isSelected));

  return (
    <div class="col gap-2">
      <div class="flex items-center gap-2">
        <h4 class="text-xs uppercase tracking-wide text-base-content/60">{KIND_LABELS[props.kind]}</h4>
        <button class="btn btn-ghost btn-xs" onClick={() => selectBases(ids(), !isAllSelected())} type="button">
          {isAllSelected() ? "Снять все" : "Выбрать все"}
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <For each={props.bases}>
          {(base) => (
            <button
              aria-pressed={isSelected(base.id)}
              class="btn btn-sm btn-primary gap-2"
              classList={{ "btn-soft": !isSelected(base.id) }}
              onClick={() => selectBases([base.id], !isSelected(base.id))}
              type="button"
            >
              {base.name}
              <span class="badge badge-sm badge-ghost">{base.level}</span>
            </button>
          )}
        </For>
      </div>
    </div>
  );
}
