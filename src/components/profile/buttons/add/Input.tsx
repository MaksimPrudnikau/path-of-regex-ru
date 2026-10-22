import { type Accessor, batch, Show } from "solid-js";

type Props = {
  name: Accessor<string>;
  error: Accessor<string>;
  setName: (value: string) => void;
  setError: (value: string) => void;
};

export function ProfileInput(props: Props) {
  return (
    <div>
      <input
        autocomplete={"name"}
        class={"input input-sm"}
        classList={{
          "border-red-500/80": !!props.error(),
        }}
        name={"name"}
        onInput={(e) => {
          batch(() => {
            props.setError("");
            props.setName(e.target.value);
          });
        }}
        placeholder={"Название профиля"}
        value={props.name()}
      />
      <Show when={!!props.error()}>
        <p class={"text-red-500/80 text-xs mt-1"}>{props.error()}</p>
      </Show>
    </div>
  );
}
