import { createMemo, For, useContext } from "solid-js";
import { FlaskWindowContext } from "../context";
import type { FlaskMod } from "../data";
import { includedValues } from "./modValues";

type Props = {
  mod: FlaskMod;
};

export function TierSelect(props: Props) {
  const { setTierCount, tierCountOf } = useContext(FlaskWindowContext);
  const counts = createMemo(() => props.mod.tiers.map((_, index) => props.mod.tiers.length - index));

  return (
    <select
      aria-label="Тир"
      class="select select-sm w-36 shrink-0 sm:w-44"
      disabled={props.mod.tiers.length === 1}
      onChange={(e) => setTierCount(props.mod.id, Number(e.currentTarget.value))}
      value={tierCountOf(props.mod.id) ?? props.mod.tiers.length}
    >
      <For each={counts()}>
        {(count) => (
          <option value={count}>
            {tierName(count, props.mod.tiers.length)}: {includedValues(props.mod, count)}
          </option>
        )}
      </For>
    </select>
  );
}

function tierName(count: number, total: number): string {
  if (count === total) return "Любой";
  return count === 1 ? "T1" : `T${count} и выше`;
}
