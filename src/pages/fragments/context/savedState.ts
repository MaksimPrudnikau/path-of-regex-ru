import { batch, createEffect, createSignal, onMount } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { type FragmentsStore, initialFragmentsState } from "./context";
import { DEFAULT_PROFILE, readSavedProfiles, writeSavedProfiles } from "./storage";

export function createSavedProfiles() {
  const [profiles, setProfiles] = createStore<Record<string, FragmentsStore>>({ [DEFAULT_PROFILE]: initialFragmentsState() });
  const [currentName, setCurrentName] = createSignal(DEFAULT_PROFILE);
  const [isRestored, setIsRestored] = createSignal(false);

  onMount(() => {
    const saved = readSavedProfiles();
    batch(() => {
      setProfiles(reconcile(saved.profiles));
      setCurrentName(saved.current);
      setIsRestored(true);
    });
  });

  createEffect(() => {
    const serialized = JSON.stringify({ current: currentName(), profiles });
    if (isRestored()) writeSavedProfiles(serialized);
  });

  return { currentName, profiles, setCurrentName, setProfiles } as const;
}
