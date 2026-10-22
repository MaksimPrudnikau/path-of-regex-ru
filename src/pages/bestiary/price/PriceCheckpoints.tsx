import { For } from "solid-js";
import { indexFrom } from "./priceSteps";

export function PriceCheckpoints(props: { steps: number[] }) {
  return (
    <For each={checkpoints(props.steps)}>
      {(checkpoint) => (
        <div
          class="pointer-events-none absolute top-full flex -translate-x-1/2 flex-col items-center"
          style={{ left: `calc(var(--thumb) / 2 + (100% - var(--thumb)) * ${checkpoint.share})` }}
        >
          <div class="h-2 w-px bg-base-content/40" />
          <span class="text-xs text-base-content/60">{checkpoint.price}</span>
        </div>
      )}
    </For>
  );
}

type Checkpoint = { price: number; share: number };

function checkpoints(steps: number[]): Checkpoint[] {
  const last = steps.length - 1;
  if (last <= 0) return [];
  const result: Checkpoint[] = [];
  for (const price of CHECKPOINT_PRICES) {
    if (price <= steps[0] || price > steps[last]) continue;
    const share = indexFrom(steps, price) / last;
    const previous = result.at(-1);
    if (share < EDGE_GAP || share > 1 - EDGE_GAP) continue;
    if (previous && share - previous.share < MIN_GAP) continue;
    result.push({ price, share });
  }
  return result;
}

const MIN_GAP = 0.06;

const EDGE_GAP = 0.03;

const CHECKPOINT_PRICES = [1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 5000];
