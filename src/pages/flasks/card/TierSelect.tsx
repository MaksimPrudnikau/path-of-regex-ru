import { createMemo, For, Show, useContext } from "solid-js";
import { FlaskWindowContext } from "../context";
import type { FlaskMod } from "../data";
import { includedValues } from "./modValues";
import { TierOption } from "./TierOption";

type Props = {
  mod: FlaskMod;
};

export function TierSelect(props: Props) {
  const { setTiers, tiersOf } = useContext(FlaskWindowContext);
  const selected = createMemo(() => tiersOf(props.mod.id) ?? []);
  const toggle = (index: number) => setTiers(props.mod.id, toggled(selected(), index, props.mod.tiers.length));

  return (
    <Show fallback={<span class="select select-sm w-34 shrink-0 select-disabled">Любой</span>} when={props.mod.tiers.length > 1}>
      <div class="dropdown shrink-0">
        <div aria-label="Тиры" class="select select-sm w-34 items-center" role="button" tabindex="0">
          <span class="truncate">{tierLabel(selected())}</span>
        </div>
        <ul class="dropdown-content menu z-10 mt-1 w-48 rounded-box border border-base-content/15 bg-base-100 p-1 shadow-lg" tabindex="-1">
          <TierOption checked={selected().length === 0} label={`Любой: ${includedValues(props.mod, [])}`} onChange={() => setTiers(props.mod.id, [])} />
          <For each={props.mod.tiers}>
            {(_, index) => (
              <TierOption
                checked={selected().includes(index())}
                label={`T${index() + 1}: ${includedValues(props.mod, [index()])}`}
                onChange={() => toggle(index())}
              />
            )}
          </For>
        </ul>
      </div>
    </Show>
  );
}

function tierLabel(tiers: number[]): string {
  return tiers.length === 0 ? "Любой" : tiers.map((index) => `T${index + 1}`).join(", ");
}

function toggled(tiers: number[], index: number, total: number): number[] {
  const next = tiers.includes(index) ? tiers.filter((tier) => tier !== index) : [...tiers, index].sort((a, b) => a - b);
  return next.length === total ? [] : next;
}
