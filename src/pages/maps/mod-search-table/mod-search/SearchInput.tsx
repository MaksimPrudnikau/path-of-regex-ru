import type { Accessor } from "solid-js";

type Props = {
  value: Accessor<string>;
  setValue: (value: string) => void;
  onPaste?: (text: string, event: ClipboardEvent) => void;
};

export function SearchInput(props: Props) {
  return (
    <label class="input w-full">
      <input
        id={"search-mod-input"}
        onInput={(e) => {
          props.setValue(e.target.value);
        }}
        onPaste={(e) => props.onPaste?.(e.clipboardData?.getData("text") ?? "", e)}
        placeholder="Модификатор или готовый regex"
        required
        type="search"
        value={props.value()}
      />
    </label>
  );
}
