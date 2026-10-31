import { type Accessor, createMemo, createSignal } from "solid-js";

export function createCopiedRegex(regex: Accessor<string>) {
  const [copiedRegex, setCopiedRegex] = createSignal<string>();
  const isCopied = createMemo(() => copiedRegex() === regex());

  async function copy() {
    const value = regex();
    try {
      await navigator.clipboard.writeText(value);
      setCopiedRegex(value);
    } catch (error) {
      console.error("[regex] Браузер не дал записать строку поиска в буфер обмена", error);
      alert("Не удалось скопировать автоматически. Выделите строку кликом и нажмите Ctrl+C");
    }
  }

  return { copy, isCopied };
}
