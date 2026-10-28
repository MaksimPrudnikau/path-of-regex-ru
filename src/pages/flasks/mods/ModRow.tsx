import { createMemo, For, Show, useContext } from "solid-js";
import { FlasksContext } from "../context";
import { type FlaskMod, KIND_LABELS } from "../data";
import { TierSelect } from "./TierSelect";

type Props = {
  mod: FlaskMod;
};

export function ModRow(props: Props) {
  const { setTierCount, tierCountOf } = useContext(FlasksContext);
  const isSelected = createMemo(() => tierCountOf(props.mod.id) !== undefined);
  const isPartial = createMemo(() => props.mod.kinds.length < Object.keys(KIND_LABELS).length);

  return (
    <div class="flex items-center gap-3 rounded-box px-3 py-2 hover:bg-base-300" classList={{ "bg-base-300": isSelected() }}>
      <label class="flex flex-1 items-center gap-3 cursor-pointer">
        <input
          checked={isSelected()}
          class="checkbox checkbox-primary checkbox-sm"
          onChange={() => setTierCount(props.mod.id, isSelected() ? undefined : props.mod.tiers.length)}
          type="checkbox"
        />
        <span class="col gap-1">
          <span class="whitespace-pre-line text-sm">{props.mod.text}</span>
          <Show when={isPartial()}>
            <span class="flex gap-1">
              <For each={props.mod.kinds}>{(kind) => <span class="badge badge-xs badge-ghost">{KIND_LABELS[kind]}</span>}</For>
            </span>
          </Show>
        </span>
      </label>
      <Show when={props.mod.tiers.length > 1}>
        <TierSelect mod={props.mod} />
      </Show>
    </div>
  );
}
