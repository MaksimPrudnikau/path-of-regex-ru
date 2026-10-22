import { createAsync, type RouteDefinition } from "@solidjs/router";
import { Show, Suspense } from "solid-js";
import { BestiaryApp, BestiarySkeleton, getBeastPrices } from "~/pages/bestiary";

export const route = {
  preload: () => getBeastPrices(),
} satisfies RouteDefinition;

export default function Bestiary() {
  const prices = createAsync(() => getBeastPrices());

  return (
    <Suspense fallback={<BestiarySkeleton />}>
      <Show when={prices()}>{(snapshot) => <BestiaryApp prices={snapshot()} />}</Show>
    </Suspense>
  );
}
