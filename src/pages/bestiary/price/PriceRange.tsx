import { createMemo, createSignal, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { ChaosField } from "./ChaosField";
import { PriceCheckpoints } from "./PriceCheckpoints";
import { indexFrom, indexTo, priceSteps } from "./priceSteps";

export function PriceRange() {
  const { applyFilters, priceOf, state, visibleBeasts } = useContext(BestiaryContext);
  const steps = createMemo(() => priceSteps(visibleBeasts().map((beast) => priceOf(beast.id))));
  const last = createMemo(() => Math.max(steps().length - 1, 0));
  const fromIndex = createMemo(() => indexFrom(steps(), state().minChaos));
  const toIndex = createMemo(() => indexTo(steps(), state().maxChaos));
  const share = (index: number) => (last() === 0 ? 0 : index / last());
  const [isFromOnTop, setIsFromOnTop] = createSignal(false);

  const moveFrom = (input: HTMLInputElement) => {
    const index = Math.min(Number(input.value), toIndex());
    applyFilters({ minChaos: index === 0 ? null : steps()[index] });
    input.value = String(fromIndex());
  };
  const moveTo = (input: HTMLInputElement) => {
    const index = Math.max(Number(input.value), fromIndex());
    applyFilters({ maxChaos: index === last() ? null : steps()[index] });
    input.value = String(toIndex());
  };

  const pickNearestThumb = (e: PointerEvent & { currentTarget: HTMLDivElement }) => {
    if (e.buttons !== 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pointer = (e.clientX - rect.left) / rect.width;
    const fromDistance = Math.abs(pointer - share(fromIndex()));
    const toDistance = Math.abs(pointer - share(toIndex()));
    setIsFromOnTop(fromDistance < toDistance || (fromDistance === toDistance && pointer < share(fromIndex())));
  };

  return (
    <div class="col w-full max-w-md gap-2">
      <div class="flex items-center justify-between">
        <ChaosField
          label="Цена от"
          onChange={(minChaos) => applyFilters({ minChaos })}
          value={state().minChaos ?? steps()[0]}
        />
        <ChaosField
          label="Цена до"
          onChange={(maxChaos) => applyFilters({ maxChaos })}
          value={state().maxChaos ?? steps()[last()]}
        />
      </div>
      <div class="relative mb-6 grid [--thumb:calc(var(--size-selector,.25rem)*5)]" onPointerMove={pickNearestThumb}>
        <PriceCheckpoints steps={steps()} />
        <div class={`${BAR_CLASS} inset-x-0 bg-base-content/10`} />
        <div
          class={`${BAR_CLASS} bg-primary`}
          style={{
            left: `calc(var(--thumb) / 2 + (100% - var(--thumb)) * ${share(fromIndex())})`,
            width: `calc((100% - var(--thumb)) * ${share(toIndex()) - share(fromIndex())})`,
          }}
        />
        <input
          aria-label="Цена от"
          class={THUMB_CLASS}
          classList={{ "z-10": isFromOnTop() }}
          disabled={last() === 0}
          max={last()}
          min="0"
          onInput={(e) => moveFrom(e.currentTarget)}
          type="range"
          value={fromIndex()}
        />
        <input
          aria-label="Цена до"
          class={THUMB_CLASS}
          disabled={last() === 0}
          max={last()}
          min="0"
          onInput={(e) => moveTo(e.currentTarget)}
          type="range"
          value={toIndex()}
        />
      </div>
    </div>
  );
}

const BAR_CLASS = "pointer-events-none absolute top-1/2 h-[calc(var(--thumb)/2)] -translate-y-1/2 rounded-selector";

const THUMB_CLASS =
  "range range-sm range-primary relative col-start-1 row-start-1 w-full pointer-events-none [--range-bg:transparent] [--range-fill:0] [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:pointer-events-auto";
