import type { Accessor } from "solid-js";

type Props = {
  value: Accessor<string>;
  setValue: (value: string) => void;
};

export function SearchInput(props: Props) {
  return (
    <label class="input w-full">
      <input
        id={"search-mod-input"}
        onInput={(e) => {
          props.setValue(e.target.value);
        }}
        placeholder="Модификатор"
        required
        type="search"
        value={props.value()}
      />
    </label>
  );
}
