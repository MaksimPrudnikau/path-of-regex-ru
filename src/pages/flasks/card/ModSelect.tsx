import { createMemo, For, useContext } from "solid-js";
import { FlaskWindowContext } from "../context";
import type { Affix } from "../data";
import { availableMods } from "./selectedMods";

type Props = {
  affix: Affix;
  value: string;
  placeholder: string;
  class: string;
  onSelect: (modId: string) => void;
};

export function ModSelect(props: Props) {
  const { state } = useContext(FlaskWindowContext);
  const options = createMemo(() =>
    availableMods(state(), props.affix).filter((mod) => mod.id === props.value || state().mods[mod.id] === undefined),
  );

  return (
    <select
      aria-label={props.placeholder}
      class={`select select-sm ${props.class}`}
      onChange={(e) => {
        props.onSelect(e.currentTarget.value);
        e.currentTarget.value = props.value;
      }}
      value={props.value}
    >
      <option disabled value="">
        {props.placeholder}
      </option>
      <For each={options()}>{(mod) => <option value={mod.id}>{mod.text.replaceAll("\n", " / ")}</option>}</For>
    </select>
  );
}
