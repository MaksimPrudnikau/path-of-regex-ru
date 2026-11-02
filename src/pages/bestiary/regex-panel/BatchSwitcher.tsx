import { createMemo, useContext } from "solid-js";
import { BatchSwitcher as RegexBatchSwitcher } from "~/components/regex";
import { BestiaryContext } from "../context";
import { MAX_REGEX_LENGTH } from "./buildBestiaryRegex";

export function BatchSwitcher() {
  const { batches, batchIndex, regex, setBatchIndex, state } = useContext(BestiaryContext);
  const isExcludeTooLong = createMemo(() => state().exclude && regex().length > MAX_REGEX_LENGTH);

  return (
    <RegexBatchSwitcher
      count={batches().length}
      hint="В зверинце вставляется первая часть, разбирается подсвеченное, затем вставляется вторая часть и так далее."
      index={batchIndex()}
      isLocked={isExcludeTooLong()}
      maxLength={MAX_REGEX_LENGTH}
      onChange={setBatchIndex}
    />
  );
}
