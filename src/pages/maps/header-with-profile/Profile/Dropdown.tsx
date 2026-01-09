import { createMemo, For, useContext } from "solid-js";
import { MapsProfileContext } from "~/pages/maps/context";

export function ProfileDropdown() {
  const { profiles, currentProfileName, setCurrentProfile } =
    useContext(MapsProfileContext);

  const profilesList = createMemo(() => {
    const p = profiles;
    if (!p || typeof p !== "object") return [];
    return Object.keys(p);
  });

  return (
    <select
      class="select min-w-36"
      onChange={(e) => {
        console.log(e.target.value);
        setCurrentProfile(e.target.value);
      }}
      value={currentProfileName()}
    >
      <For each={profilesList()}>
        {(profile) => <option value={profile}>{profile}</option>}
      </For>
    </select>
  );
}
