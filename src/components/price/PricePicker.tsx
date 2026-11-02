import { createMemo, useContext } from "solid-js";
import { FilterSelect } from "../FilterSelect";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { PriceControlsContext } from "./context";
import { PriceRange } from "./PriceRange";

export function PricePicker() {
  const { league, setLeague, snapshot } = useContext(PriceControlsContext);
  const leagueNames = createMemo(() => snapshot().leagues.map((item) => item.name));
  const updatedAt = createMemo(() =>
    new Date(snapshot().updatedAt).toLocaleString("ru", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Europe/Moscow",
    }),
  );

  return (
    <div class="flex flex-wrap items-center gap-3">
      <FilterSelect label="Лига" onChange={setLeague} options={leagueNames()} value={league() || leagueNames()[0]} />
      <CurrencySwitcher />
      <PriceRange />
      <span class="text-xs text-base-content/60" classList={{ "text-warning": !snapshot().isLive }}>
        {snapshot().isLive ? "Цены poe.ninja на" : "poe.ninja недоступен, цены из снимка на"} {updatedAt()} МСК
      </span>
    </div>
  );
}
