import { For, useContext } from "solid-js";
import { MapsProfileContext } from "~/pages/maps/context";

export function ProfileDropdown() {
  const context = useContext(MapsProfileContext);

  const profiles = () => Array.from(context.profiles().keys());

  return (
    <select
      class="select min-w-36"
      onChange={(e) => context.setCurrentProfile(e.target.value)}
      value={context.currentProfile()}
    >
      <For each={profiles()}>
        {(profile) => (
          <option selected={context.currentProfile() === profile}>{profile}</option>
        )}
      </For>
    </select>
  );
}
