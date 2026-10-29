import { createMemo, useContext } from "solid-js";
import { RegexBlock } from "~/components/regex";
import { BestiaryContext } from "../context";
import { BatchSwitcher } from "./BatchSwitcher";
import { MAX_REGEX_LENGTH } from "./buildBestiaryRegex";
import { ExcludeToggle } from "./ExcludeToggle";
import { SelectedBeasts } from "./SelectedBeasts";

export function RegexPanel() {
  const { regex, reset } = useContext(BestiaryContext);
  const errorMessage = createMemo(() =>
    regex().length > MAX_REGEX_LENGTH
      ? "В режиме исключения строку нельзя разбить на части: каждая часть подсветила бы зверей из остальных. Уберите часть зверей."
      : undefined,
  );

  return (
    <RegexBlock
      class="md:sticky top-0 z-10 shadow-lg"
      controls={
        <>
          <ExcludeToggle />
          <BatchSwitcher />
        </>
      }
      emptyHint="Выберите рецепты или зверей ниже, и здесь появится строка для поиска в Бестиарии"
      errorMessage={errorMessage}
      maxLength={MAX_REGEX_LENGTH}
      onReset={reset}
      regex={regex}
    >
      <SelectedBeasts />
    </RegexBlock>
  );
}
