import { For, useContext } from "solid-js";
import { ProfileControlsContext } from "../../context";

type Props = {
  setDuplicateFrom: (value: string) => void;
};

export function DuplicateFrom(props: Props) {
  const { profileNames } = useContext(ProfileControlsContext);

  return (
    <div class={"col gap-2"}>
      <span class={"text-sm"}>или дублировать из:</span>
      <select
        class="select appearance-none select-sm"
        name={"duplicateFrom"}
        onChange={(e) => {
          props.setDuplicateFrom(e.target.value);
        }}
      >
        <option disabled selected>
          Выберирите профиль
        </option>

        <For each={profileNames()}>{(profile) => <option>{profile}</option>}</For>
      </select>
    </div>
  );
}
