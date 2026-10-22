import { batch, createMemo, createSignal, type ParentProps } from "solid-js";
import { beasts } from "../data";
import { type PriceSnapshot, pricesOf } from "../price/prices";
import { buildBestiaryBatches, MAX_REGEX_LENGTH } from "../regex-panel/buildBestiaryRegex";
import { BestiaryContext, type BestiaryStore, initialBestiaryState } from "./context";
import { isInPriceRange, matchesFilters, sortByPrice } from "./derive";
import { createProfileActions } from "./profileActions";
import { createSavedProfiles } from "./savedState";

export function BestiaryContextProvider(props: ParentProps<{ prices: PriceSnapshot }>) {
  const saved = createSavedProfiles();
  const [search, setSearch] = createSignal("");
  const [batchIndex, setBatchIndex] = createSignal(0);

  const state = createMemo(() => saved.profiles[saved.currentName()] ?? initialBestiaryState());
  const selectedIds = createMemo(() => new Set(state().selected));
  const prices = createMemo(() => pricesOf(props.prices, state().league));
  const sortedBeasts = createMemo(() => sortByPrice(beasts, prices()));
  const visibleBeasts = createMemo(() => sortedBeasts().filter((beast) => matchesFilters(beast, state())));
  const batches = createMemo(() => buildBestiaryBatches(state(), sortedBeasts(), MAX_REGEX_LENGTH));
  const currentBatch = createMemo(() => Math.max(0, Math.min(batchIndex(), batches().length - 1)));

  const update = (patch: Partial<BestiaryStore>) => saved.setProfiles(saved.currentName(), patch);
  const applyFilters = (patch: Partial<BestiaryStore>) =>
    batch(() => {
      update(patch);
      if (state().minChaos === null && state().maxChaos === null) return;
      update({ selected: visibleBeasts().filter((beast) => isInPriceRange(prices()[beast.id], state())).map((beast) => beast.id) });
    });
  const selectBeasts = (ids: string[], selected: boolean) => {
    const rest = state().selected.filter((id) => !ids.includes(id));
    update({ selected: selected ? [...rest, ...ids] : rest });
  };

  return (
    <BestiaryContext.Provider
      value={{
        ...createProfileActions(saved),
        applyFilters,
        batches,
        batchIndex: currentBatch,
        currentProfileName: saved.currentName,
        isSelected: (id) => selectedIds().has(id),
        priceOf: (id) => prices()[id],
        priceSnapshot: () => props.prices,
        profileNames: () => Object.keys(saved.profiles),
        regex: () => batches()[currentBatch()] ?? "",
        reset: () =>
          batch(() => {
            update({ exclude: false, selected: [] });
            setSearch("");
            setBatchIndex(0);
          }),
        search,
        selectBeasts,
        setBatchIndex,
        setSearch,
        state,
        toggleBeast: (id) => selectBeasts([id], !selectedIds().has(id)),
        update,
        visibleBeasts,
      }}
    >
      {props.children}
    </BestiaryContext.Provider>
  );
}
