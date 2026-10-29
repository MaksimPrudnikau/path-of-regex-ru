import { createMemo, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { FilterSelect } from "../filters/FilterSelect";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { PriceRange } from "./PriceRange";

export function PricePicker() {
  const { applyFilters, priceSnapshot, state } = useContext(BestiaryContext);
  const leagueNames = createMemo(() => priceSnapshot().leagues.map((league) => league.name));
  const updatedAt = createMemo(() =>
    new Date(priceSnapshot().updatedAt).toLocaleString("ru", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Europe/Moscow",
    }),
  );

  return (
    <div class="flex flex-wrap items-center gap-3">
      <FilterSelect
        label="Лига"
        onChange={(league) => applyFilters({ league })}
        options={leagueNames()}
        value={state().league || leagueNames()[0]}
      />
      <CurrencySwitcher />
      <PriceRange />
      <span class="text-xs text-base-content/60" classList={{ "text-warning": !priceSnapshot().isLive }}>
        {priceSnapshot().isLive ? "Цены poe.ninja на" : "poe.ninja недоступен, цены из снимка на"} {updatedAt()} МСК
      </span>
    </div>
  );
}
