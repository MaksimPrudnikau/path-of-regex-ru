import { createMemo, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { isInPriceRange } from "../context/derive";
import { FilterSelect } from "../filters/FilterSelect";
import { ChaosInput } from "./ChaosInput";

export function PricePicker() {
  const { priceOf, priceSnapshot, state, update, visibleBeasts } = useContext(BestiaryContext);
  const leagueNames = createMemo(() => priceSnapshot().leagues.map((league) => league.name));
  const matchingIds = createMemo(() =>
    visibleBeasts()
      .filter((beast) => isInPriceRange(priceOf(beast.id), state()))
      .map((beast) => beast.id),
  );
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
        onChange={(league) => update({ league })}
        options={leagueNames()}
        value={state().league || leagueNames()[0]}
      />
      <ChaosInput label="От" onChange={(minChaos) => update({ minChaos })} value={state().minChaos} />
      <ChaosInput label="До" onChange={(maxChaos) => update({ maxChaos })} value={state().maxChaos} />
      <button
        class="btn btn-sm btn-primary"
        disabled={matchingIds().length === 0}
        onClick={() => update({ selected: matchingIds() })}
        type="button"
      >
        Выбрать по цене: {matchingIds().length}
      </button>
      <span class="text-xs text-base-content/60" classList={{ "text-warning": !priceSnapshot().isLive }}>
        {priceSnapshot().isLive ? "Цены poe.ninja на" : "poe.ninja недоступен, цены из снимка на"} {updatedAt()} МСК
      </span>
    </div>
  );
}
