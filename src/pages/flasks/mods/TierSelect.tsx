import { For, useContext } from "solid-js";
import { FlasksContext } from "../context";
import type { FlaskMod } from "../data";
import { tierValues } from "./tierValues";

type Props = {
  mod: FlaskMod;
};

export function TierSelect(props: Props) {
  const { setTierCount, tierCountOf } = useContext(FlasksContext);

  return (
    <select
      aria-label="Минимальный тир"
      class="select select-sm w-44 shrink-0"
      onChange={(e) => setTierCount(props.mod.id, Number(e.currentTarget.value))}
      value={tierCountOf(props.mod.id) ?? props.mod.tiers.length}
    >
      <For each={props.mod.tiers}>
        {(tier, index) => (
          <option title={`Тир ${index() + 1}, уровень предмета от ${tier.level}`} value={index() + 1}>
            {index() === props.mod.tiers.length - 1 ? "Любой тир" : `от T${index() + 1}: ${tierValues(props.mod, tier)}`}
          </option>
        )}
      </For>
    </select>
  );
}
