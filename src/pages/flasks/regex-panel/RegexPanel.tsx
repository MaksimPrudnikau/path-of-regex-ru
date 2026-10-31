import { createMemo, useContext } from "solid-js";
import { RegexBlock } from "~/components/regex";
import { FlasksContext } from "../context";
import { MAX_REGEX_LENGTH } from "./buildFlaskRegex";
import { SearchSwitcher } from "./SearchSwitcher";

export function RegexPanel() {
  const { importRegex, regex, reset } = useContext(FlasksContext);
  const errorMessage = createMemo(() =>
    regex().length > MAX_REGEX_LENGTH
      ? `Строка длиннее ${MAX_REGEX_LENGTH} символов, игра её обрежет. Уберите часть свойств или выберите тиры повыше.`
      : undefined,
  );

  return (
    <RegexBlock
      class="md:sticky top-0 z-10 shadow-lg"
      controls={<SearchSwitcher />}
      emptyHint="Выберите базы и свойства флаконов ниже, и здесь появится строка для поиска у торговца или в тайнике"
      errorMessage={errorMessage}
      maxLength={MAX_REGEX_LENGTH}
      onImport={importRegex}
      onReset={reset}
      regex={regex}
    />
  );
}
