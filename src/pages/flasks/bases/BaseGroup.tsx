import { createMemo, For, useContext } from "solid-js";
import { FlaskWindowContext } from "../context";
import { type FlaskBase, type FlaskKind, KIND_LABELS } from "../data";
import { BaseButton } from "./BaseButton";

type Props = {
  kind: FlaskKind;
  bases: FlaskBase[];
};

export function BaseGroup(props: Props) {
  const { selectBases, state } = useContext(FlaskWindowContext);
  const ids = createMemo(() => props.bases.map((base) => base.id));
  const isAllSelected = createMemo(() => ids().every((id) => state().bases.includes(id)));

  return (
    <div class="flex flex-col gap-1 md:flex-row md:items-start md:gap-3">
      <div class="flex items-center gap-1 md:w-28 md:shrink-0 md:flex-col md:items-start md:pt-4">
        <h4 class="text-xs uppercase tracking-wide text-base-content/60">{KIND_LABELS[props.kind]}</h4>
        <button class="btn btn-ghost btn-xs px-1 font-normal text-base-content/60" onClick={() => selectBases(ids(), !isAllSelected())} type="button">
          {isAllSelected() ? "Снять все" : "Выбрать все"}
        </button>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <For each={props.bases}>{(base) => <BaseButton base={base} />}</For>
      </div>
    </div>
  );
}
