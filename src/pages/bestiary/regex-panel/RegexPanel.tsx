import { createMemo, Show, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { BatchSwitcher } from "./BatchSwitcher";
import { MAX_REGEX_LENGTH } from "./buildBestiaryRegex";
import { CopyButton } from "./CopyButton";
import { ExcludeToggle } from "./ExcludeToggle";
import { SelectedBeasts } from "./SelectedBeasts";

export function RegexPanel() {
  const { regex, reset } = useContext(BestiaryContext);
  const isTooLong = createMemo(() => regex().length > MAX_REGEX_LENGTH);

  return (
    <section class="card bg-base-200 md:sticky top-0 z-10 shadow-lg">
      <div class="card-body gap-3 p-5">
        <Show
          fallback={
            <p class="text-base-content/50 min-h-8">
              Выберите рецепты или зверей ниже, и здесь появится строка для поиска в Бестиарии
            </p>
          }
          when={regex() !== ""}
        >
          <code class="text-xl font-bold break-all min-h-8 select-all" classList={{ "text-error": isTooLong() }}>
            {regex()}
          </code>
        </Show>
        <div class="flex flex-wrap items-center gap-3">
          <CopyButton />
          <button class="btn btn-secondary" onClick={reset} type="button">
            Сбросить
          </button>
          <ExcludeToggle />
          <BatchSwitcher />
          <span class="ml-auto text-sm" classList={{ "text-error": isTooLong() }}>
            Длина: {regex().length} / {MAX_REGEX_LENGTH}
          </span>
        </div>
        <Show when={isTooLong()}>
          <span class="italic text-error">
            В режиме исключения строку нельзя разбить на части: каждая часть подсветила бы зверей из остальных. Уберите часть зверей.
          </span>
        </Show>
        <SelectedBeasts />
      </div>
    </section>
  );
}
