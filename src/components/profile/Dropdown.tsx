import { For, useContext } from "solid-js";
import { ProfileControlsContext } from "./context";

export function ProfileDropdown() {
  const { profileNames, currentProfileName, setCurrentProfile } = useContext(ProfileControlsContext);

  return (
    <select class="select min-w-36" onChange={(e) => setCurrentProfile(e.target.value)} value={currentProfileName()}>
      <For each={profileNames()}>{(profile) => <option value={profile}>{profile}</option>}</For>
    </select>
  );
}
