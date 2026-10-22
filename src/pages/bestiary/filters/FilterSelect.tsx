import { For, Show } from "solid-js";

type Props = {
  label: string;
  value: string;
  allLabel?: string;
  options: string[];
  onChange: (value: string) => void;
};

export function FilterSelect(props: Props) {
  return (
    <label class="select select-sm w-auto">
      <span class="label">{props.label}</span>
      <select onChange={(e) => props.onChange(e.currentTarget.value)} value={props.value}>
        <Show when={props.allLabel}>
          <option value="">{props.allLabel}</option>
        </Show>
        <For each={props.options}>{(option) => <option value={option}>{option}</option>}</For>
      </select>
    </label>
  );
}
