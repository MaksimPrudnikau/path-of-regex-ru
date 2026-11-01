import { createMemo, Show, useContext } from "solid-js";
import { CURRENCIES, formatPrice, PriceControlsContext } from "~/components/price";
import { FragmentsContext, type ListName } from "../context";
import type { FragmentItem } from "../data";

type Props = {
  item: FragmentItem;
  list: ListName;
};

export function ItemButton(props: Props) {
  const { isSelected, priceOf, toggleItem } = useContext(FragmentsContext);
  const { chaosPerUnit, currency } = useContext(PriceControlsContext);
  const isActive = createMemo(() => isSelected(props.list, props.item.id));
  const price = createMemo(() => priceOf(props.item.id));

  return (
    <button
      aria-pressed={isActive()}
      class="btn h-auto min-h-12 justify-start gap-3 p-2 text-left text-wrap"
      classList={{
        "btn-error": isActive() && props.list === "exclude",
        "btn-primary": isActive() && props.list === "include",
        "btn-soft": !isActive(),
      }}
      onClick={() => toggleItem(props.list, props.item.id)}
      type="button"
    >
      <img alt="" class="size-8 object-contain" loading="lazy" src={props.item.icon} />
      <span class="grow">{props.item.name}</span>
      <Show when={price() !== undefined}>
        <span class="badge badge-sm badge-ghost gap-1">
          {formatPrice(price() ?? 0, currency(), chaosPerUnit())}
          <img alt={CURRENCIES[currency()].label} class="size-5" src={CURRENCIES[currency()].icon} />
        </span>
      </Show>
    </button>
  );
}
