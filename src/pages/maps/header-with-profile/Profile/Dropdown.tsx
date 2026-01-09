import { createMemo, createSignal, For, onMount, useContext } from "solid-js";
import { MapsProfileContext } from "~/pages/maps/context";

export function ProfileDropdown() {
  const { profiles, currentProfileName, setCurrentProfile } =
    useContext(MapsProfileContext);

  // Используем локальный сигнал для контроля рендеринга
  const [isClient, setIsClient] = createSignal(false);

  onMount(() => setIsClient(true));

  const profilesList = createMemo(() => {
    if (!isClient()) return [];
    const p = profiles;
    if (!p || typeof p !== "object") return [];
    return Object.keys(p);
  });

  return (
    <select
      class="select min-w-36"
      onChange={(e) => setCurrentProfile(e.target.value)}
      value={currentProfileName()}
    >
      <For each={profilesList()}>
        {(profile) => <option value={profile}>{profile}</option>}
      </For>
    </select>
  );
}
