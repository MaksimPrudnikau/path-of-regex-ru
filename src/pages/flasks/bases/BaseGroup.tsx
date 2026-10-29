import { createMemo, For } from "solid-js";
import { type FlaskKind, flaskData, KIND_LABELS } from "../data";
import { BaseButton } from "./BaseButton";

type Props = {
  kind: FlaskKind;
  selected: string[];
  onSelect: (baseIds: string[], selected: boolean) => void;
};

export function BaseGroup(props: Props) {
  const bases = createMemo(() => flaskData.bases.filter((base) => base.kind === props.kind));
  const ids = createMemo(() => bases().map((base) => base.id));
  const isAllSelected = createMemo(() => ids().every((id) => props.selected.includes(id)));

  return (
    <div class="col gap-1">
      <div class="flex items-center gap-2">
        <h4 class="text-xs uppercase tracking-wide text-base-content/60">{KIND_LABELS[props.kind]}</h4>
        <button class="btn btn-ghost btn-xs font-normal text-base-content/60" onClick={() => props.onSelect(ids(), !isAllSelected())} type="button">
          {isAllSelected() ? "Снять все" : "Выбрать все"}
        </button>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <For each={bases()}>
          {(base) => {
            const isSelected = () => props.selected.includes(base.id);
            return <BaseButton base={base} isSelected={isSelected()} onClick={() => props.onSelect([base.id], !isSelected())} />;
          }}
        </For>
      </div>
    </div>
  );
}
