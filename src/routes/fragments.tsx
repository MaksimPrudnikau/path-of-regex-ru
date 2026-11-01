import { createAsync, type RouteDefinition } from "@solidjs/router";
import { Show, Suspense } from "solid-js";
import { FragmentsApp, FragmentsSkeleton, getFragmentPrices } from "~/pages/fragments";

export const route = {
  preload: () => getFragmentPrices(),
} satisfies RouteDefinition;

export default function Fragments() {
  const prices = createAsync(() => getFragmentPrices());

  return (
    <Suspense fallback={<FragmentsSkeleton />}>
      <Show when={prices()}>{(snapshot) => <FragmentsApp prices={snapshot()} />}</Show>
    </Suspense>
  );
}
