import { createMemo, Show, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { type Beast, recipeLabel, recipesOf } from "../data";
import { BEAST_TONES } from "../beastTone";
import { CURRENCIES, formatPrice } from "../price/currency";

type Props = {
  beast: Beast;
};

export function BeastButton(props: Props) {
  const { chaosPerUnit, currency, isSelected, priceOf, toggleBeast } = useContext(BestiaryContext);
  const isActive = createMemo(() => isSelected(props.beast.id));
  const price = createMemo(() => priceOf(props.beast.id));
  const usage = createMemo(() => recipesOf(props.beast).map(recipeLabel).join("\n"));

  return (
    <button
      aria-pressed={isActive()}
      class={`btn btn-sm h-12 gap-2 text-left ${BEAST_TONES[props.beast.color].button}`}
      classList={{ "btn-soft": !isActive() }}
      onClick={() => toggleBeast(props.beast.id)}
      title={[props.beast.group, usage()].filter(Boolean).join("\n")}
      type="button"
    >
      {props.beast.name}
      <Show when={price() !== undefined}>
        <span class="badge badge-sm badge-ghost gap-1">
          {formatPrice(price() ?? 0, currency(), chaosPerUnit())}
          <img alt={CURRENCIES[currency()].label} class="size-5" src={CURRENCIES[currency()].icon} />
        </span>
      </Show>
    </button>
  );
}
