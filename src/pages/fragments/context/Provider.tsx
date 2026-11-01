import { batch, createMemo, createSignal, type ParentProps } from "solid-js";
import { type Currency, PriceControlsContext } from "~/components/price";
import { priceSteps } from "~/components/price/priceSteps";
import { createProfileActions } from "~/components/profile";
import { divineChaosOf, type PriceSnapshot, pricesOf } from "~/lib/prices";
import { items } from "../data";
import { buildFragmentBatches, MAX_REGEX_LENGTH } from "../regex-panel/buildFragmentRegex";
import type { TabId } from "../tabs";
import { FragmentsContext, type FragmentsStore, initialFragmentsState, type ListName } from "./context";
import { isInPriceRange, sortByPrice } from "./derive";
import { createSavedProfiles } from "./savedState";

export function FragmentsContextProvider(props: ParentProps<{ prices: PriceSnapshot }>) {
  const saved = createSavedProfiles();
  const [batchIndex, setBatchIndex] = createSignal(0);

  const state = createMemo(() => saved.profiles[saved.currentName()] ?? initialFragmentsState());
  const prices = createMemo(() => pricesOf(props.prices, state().league));
  const divineChaos = createMemo(() => divineChaosOf(props.prices, state().league));
  const currency = createMemo<Currency>(() => (state().currency === "divine" && divineChaos() !== null ? "divine" : "chaos"));
  const chaosPerUnit = createMemo(() => (currency() === "divine" ? (divineChaos() ?? 1) : 1));
  const tabItems = createMemo(() => sortByPrice(items.filter((item) => item.tab === state().tab), prices()));
  const selection = createMemo(() => state().selections[state().tab]);
  const steps = createMemo(() => priceSteps(tabItems().map((item) => prices()[item.id])));
  const batches = createMemo(() => buildFragmentBatches(selection(), tabItems(), MAX_REGEX_LENGTH));
  const currentBatch = createMemo(() => Math.max(0, Math.min(batchIndex(), batches().length - 1)));

  const update = (patch: Partial<FragmentsStore>) => saved.setProfiles(saved.currentName(), patch);
  const updateSelection = (patch: Partial<FragmentsStore["selections"][TabId]>) =>
    saved.setProfiles(saved.currentName(), "selections", state().tab, patch);
  const applyRange = (patch: Partial<FragmentsStore>) =>
    batch(() => {
      update(patch);
      if (state().minChaos === null && state().maxChaos === null) return;
      const inRange = tabItems().filter((item) => isInPriceRange(prices()[item.id], state())).map((item) => item.id);
      updateSelection({
        exclude: selection().exclude.filter((id) => !inRange.includes(id)),
        include: inRange,
      });
    });
  const toggleItem = (list: ListName, id: string) => {
    const other: ListName = list === "include" ? "exclude" : "include";
    const isIn = selection()[list].includes(id);
    updateSelection({
      [list]: isIn ? selection()[list].filter((item) => item !== id) : [...selection()[list], id],
      [other]: selection()[other].filter((item) => item !== id),
    });
  };

  return (
    <FragmentsContext.Provider
      value={{
        ...createProfileActions(saved, initialFragmentsState),
        batchIndex: currentBatch,
        batches,
        currentProfileName: saved.currentName,
        isSelected: (list, id) => selection()[list].includes(id),
        priceOf: (id) => prices()[id],
        profileNames: () => Object.keys(saved.profiles),
        regex: () => batches()[currentBatch()] ?? "",
        reset: () =>
          batch(() => {
            update({ maxChaos: null, minChaos: null });
            updateSelection({ exclude: [], include: [] });
            setBatchIndex(0);
          }),
        setBatchIndex,
        setTab: (tab) =>
          batch(() => {
            applyRange({ tab });
            setBatchIndex(0);
          }),
        state,
        tabItemCount: (tab) => items.filter((item) => item.tab === tab).length,
        tabItems,
        toggleItem,
      }}
    >
      <PriceControlsContext.Provider
        value={{
          chaosPerUnit,
          currency,
          isDivineAvailable: () => divineChaos() !== null,
          league: () => state().league,
          maxChaos: () => state().maxChaos,
          minChaos: () => state().minChaos,
          setCurrency: (next) => update({ currency: next }),
          setLeague: (league) => applyRange({ league }),
          setRange: applyRange,
          snapshot: () => props.prices,
          steps,
        }}
      >
        {props.children}
      </PriceControlsContext.Provider>
    </FragmentsContext.Provider>
  );
}
