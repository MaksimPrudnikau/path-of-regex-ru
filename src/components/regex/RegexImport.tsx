import { createSignal, Show } from "solid-js";

type Props = {
  onImport: (text: string) => boolean;
};

export function RegexImport(props: Props) {
  const [isFailed, setIsFailed] = createSignal(false);

  function importText(text: string) {
    if (text.trim() === "") return false;
    setIsFailed(!props.onImport(text));
    return !isFailed();
  }

  return (
    <div class="col gap-1">
      <input
        aria-label="Вставить готовую строку поиска"
        autocomplete="off"
        class="input w-full"
        classList={{ "input-error": isFailed() }}
        name="import-regex"
        onChange={(event) => {
          if (importText(event.currentTarget.value)) event.currentTarget.value = "";
        }}
        onPaste={(event) => {
          event.preventDefault();
          importText(event.clipboardData?.getData("text") ?? "");
        }}
        placeholder="Вставьте готовую строку поиска, и карточки подберутся сами"
        type="text"
      />
      <Show when={isFailed()}>
        <span class="text-sm italic text-error">Не удалось разобрать строку. Вставьте строку поиска, скопированную с этого сайта.</span>
      </Show>
    </div>
  );
}
