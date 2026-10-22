import { createMemo, Show, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { MAX_REGEX_LENGTH } from "./buildBestiaryRegex";

export function BatchSwitcher() {
  const { batches, batchIndex, regex, setBatchIndex, state } = useContext(BestiaryContext);
  const isExcludeTooLong = createMemo(() => state().exclude && regex().length > MAX_REGEX_LENGTH);

  return (
    <Show when={batches().length > 1 || isExcludeTooLong()}>
      <div
        class="tooltip tooltip-bottom join"
        data-tip={
          isExcludeTooLong()
            ? "В режиме исключения строку нельзя разбить на части: каждая часть подсветила бы зверей из остальных. Уберите часть зверей или выключите исключение."
            : `
        Поиск в игре ограничен ${MAX_REGEX_LENGTH} символами, поэтому ввод разбивается на части.
        В зверинце вставляется первая часть, разбирается подсвеченное, затем вставляется вторая часть и так далее.
        `
        }
      >
        <button
          class="btn btn-primary join-item text-xl"
          disabled={isExcludeTooLong() || batchIndex() === 0}
          onClick={() => setBatchIndex(batchIndex() - 1)}
          type="button"
        >
          ‹
        </button>
        <span class="btn btn-neutral join-item pointer-events-none">
          Строка {batchIndex() + 1} из {batches().length}
          <span class="badge badge-xs badge-ghost">?</span>
        </span>
        <button
          class="btn btn-primary join-item text-xl"
          disabled={isExcludeTooLong() || batchIndex() === batches().length - 1}
          onClick={() => setBatchIndex(batchIndex() + 1)}
          type="button"
        >
          ›
        </button>
      </div>
    </Show>
  );
}
