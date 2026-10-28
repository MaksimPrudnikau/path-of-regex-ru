import { createMemo, Match, Switch, useContext } from "solid-js";
import { FlasksContext } from "../context";
import { MAX_REGEX_LENGTH } from "./buildFlaskRegex";
import { CopyButton } from "./CopyButton";
import { MatchBothToggle } from "./MatchBothToggle";

export function RegexPanel() {
  const { regex, reset } = useContext(FlasksContext);
  const isTooLong = createMemo(() => regex().length > MAX_REGEX_LENGTH);

  return (
    <section class="card bg-base-200 md:sticky top-0 z-10 shadow-lg">
      <div class="card-body gap-3 p-5">
        <Switch fallback={<code class="text-xl font-bold break-all min-h-8 select-all">{regex()}</code>}>
          <Match when={regex() === ""}>
            <p class="text-base-content/50 min-h-8">
              Выберите базы и свойства флаконов ниже, и здесь появится строка для поиска у торговца или в тайнике
            </p>
          </Match>
          <Match when={isTooLong()}>
            <p class="italic text-error min-h-8 break-all">
              Строка длиннее {MAX_REGEX_LENGTH} символов, игра её обрежет. Уберите часть свойств или выберите тиры повыше: {regex()}
            </p>
          </Match>
        </Switch>
        <div class="flex flex-wrap items-center gap-3">
          <CopyButton />
          <button class="btn btn-secondary" onClick={reset} type="button">
            Сбросить
          </button>
          <MatchBothToggle />
          <span class="ml-auto text-sm" classList={{ "text-error": isTooLong() }}>
            Длина: {regex().length} / {MAX_REGEX_LENGTH}
          </span>
        </div>
      </div>
    </section>
  );
}
