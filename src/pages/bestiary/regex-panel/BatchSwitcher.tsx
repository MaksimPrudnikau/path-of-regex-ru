import { Show, useContext } from "solid-js";
import { BestiaryContext } from "../context";

export function BatchSwitcher() {
  const { batches, batchIndex, setBatchIndex } = useContext(BestiaryContext);

  return (
    <Show when={batches().length > 1}>
      <div class="join">
        <button
          class="btn btn-sm join-item"
          disabled={batchIndex() === 0}
          onClick={() => setBatchIndex(batchIndex() - 1)}
          type="button"
        >
          ‹
        </button>
        <span class="btn btn-sm join-item pointer-events-none">
          Строка {batchIndex() + 1} из {batches().length}
        </span>
        <button
          class="btn btn-sm join-item"
          disabled={batchIndex() === batches().length - 1}
          onClick={() => setBatchIndex(batchIndex() + 1)}
          type="button"
        >
          ›
        </button>
      </div>
    </Show>
  );
}
