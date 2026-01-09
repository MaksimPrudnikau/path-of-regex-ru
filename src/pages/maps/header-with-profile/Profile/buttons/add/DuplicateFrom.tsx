import { createMemo, For, useContext } from "solid-js";
import { MapsProfileContext } from "~/pages/maps/context";

type Props = {
  setDuplicateFrom: (value: string) => void;
};

export function DuplicateFrom(props: Props) {
  const { profiles } = useContext(MapsProfileContext);

  const profilesList = createMemo(() => {
    const p = profiles;
    if (!p || typeof p !== "object") return [];
    return Object.keys(p);
  });

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

        <For each={profilesList()}>{(profile) => <option>{profile}</option>}</For>
      </select>
    </div>
  );
}
