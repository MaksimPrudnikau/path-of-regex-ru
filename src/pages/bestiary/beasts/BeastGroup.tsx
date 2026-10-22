import { createMemo, For, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import type { Beast } from "../data";
import { BeastButton } from "./BeastButton";

type Props = {
  family: string;
  beasts: Beast[];
};

export function BeastGroup(props: Props) {
  const { isSelected, selectBeasts } = useContext(BestiaryContext);
  const ids = createMemo(() => props.beasts.map((beast) => beast.id));
  const isAllSelected = createMemo(() => ids().every(isSelected));

  return (
    <div class="col gap-2">
      <div class="flex items-center gap-2">
        <h4 class="text-xs uppercase tracking-wide text-base-content/60">{props.family}</h4>
        <button
          class="btn btn-ghost btn-xs"
          onClick={() => selectBeasts(ids(), !isAllSelected())}
          type="button"
        >
          {isAllSelected() ? "Снять всех" : "Выбрать всех"}
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <For each={props.beasts}>{(beast) => <BeastButton beast={beast} />}</For>
      </div>
    </div>
  );
}
