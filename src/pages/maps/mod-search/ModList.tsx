import { For } from "solid-js";

type Props = {
  mods?: Array<unknown>;
};

export function ModList(props: Props) {
  return (
    <For each={props.mods}>
      {(mod) => {
        return <div />;
      }}
    </For>
  );
}
