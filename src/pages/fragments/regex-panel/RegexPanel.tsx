import { createMemo, useContext } from "solid-js";
import { BatchSwitcher, RegexBlock } from "~/components/regex";
import { FragmentsContext } from "../context";
import { MAX_REGEX_LENGTH } from "./buildFragmentRegex";

export function RegexPanel() {
  const { batchIndex, batches, regex, reset, setBatchIndex } = useContext(FragmentsContext);
  const errorMessage = createMemo(() =>
    regex().length > MAX_REGEX_LENGTH ? "Строка слишком длинная даже для одной части. Уберите часть предметов из списка исключения." : undefined,
  );

  return (
    <RegexBlock
      class="md:sticky top-0 z-10 shadow-lg"
      controls={
        <BatchSwitcher
          count={batches().length}
          hint="В тайнике вставляется первая часть, забирается подсвеченное, затем вставляется вторая часть и так далее."
          index={batchIndex()}
          maxLength={MAX_REGEX_LENGTH}
          onChange={setBatchIndex}
        />
      }
      emptyHint="Выберите предметы ниже, и здесь появится строка для поиска во вкладке тайника"
      errorMessage={errorMessage}
      maxLength={MAX_REGEX_LENGTH}
      onReset={reset}
      regex={regex}
    />
  );
}
