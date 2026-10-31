import { For, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { CURRENCIES, type Currency } from "./currency";

export function CurrencySwitcher() {
  const { currency, isDivineAvailable, update } = useContext(BestiaryContext);

  return (
    <div aria-label="Валюта цен" class="join" role="group">
      <For each={Object.keys(CURRENCIES) as Currency[]}>
        {(option) => (
          <button
            aria-pressed={currency() === option}
            class="btn btn-sm join-item gap-1.5 font-normal"
            classList={{ "btn-primary": currency() === option }}
            disabled={option === "divine" && !isDivineAvailable()}
            onClick={() => update({ currency: option })}
            title={option === "divine" && !isDivineAvailable() ? "Для этой лиги на poe.ninja нет курса дивана" : undefined}
            type="button"
          >
            <img alt="" class="size-4" src={CURRENCIES[option].icon} />
            {CURRENCIES[option].label}
          </button>
        )}
      </For>
    </div>
  );
}
