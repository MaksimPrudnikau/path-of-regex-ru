import { createMemo, createSignal, Show, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { MAX_REGEX_LENGTH } from "./buildBestiaryRegex";

export function CopyButton() {
  const { regex } = useContext(BestiaryContext);
  const [copiedRegex, setCopiedRegex] = createSignal<string>();
  const isCopied = createMemo(() => copiedRegex() === regex());

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(regex());
      setCopiedRegex(regex());
    } catch (error) {
      console.error("[bestiary] Браузер не дал записать строку поиска в буфер обмена", error);
      alert("Не удалось скопировать автоматически. Выделите строку кликом и нажмите Ctrl+C");
    }
  };

  return (
    <button
      class="btn btn-primary min-w-36"
      classList={{ "btn-success": isCopied() }}
      disabled={regex() === "" || regex().length > MAX_REGEX_LENGTH}
      onClick={copyToClipboard}
      type="button"
    >
      <Show fallback="Скопировать" when={isCopied()}>
        Скопировано ✓
      </Show>
    </button>
  );
}
