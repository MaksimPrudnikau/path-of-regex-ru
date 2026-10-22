import { batch } from "solid-js";
import { reconcile, unwrap } from "solid-js/store";
import type { ProfileControls } from "~/components/profile";
import { initialBestiaryState } from "./context";
import type { createSavedProfiles } from "./savedState";

type SavedProfiles = ReturnType<typeof createSavedProfiles>;

export function createProfileActions({
  currentName,
  profiles,
  setCurrentName,
  setProfiles,
}: SavedProfiles): Omit<ProfileControls, "profileNames" | "currentProfileName"> {
  return {
    addProfile: (name, duplicateFrom) => {
      if (!name.trim()) return alert("Введите название профиля");
      if (name in profiles) return alert(`Профиль с именем "${name}" уже существует`);
      const source = duplicateFrom ? profiles[duplicateFrom] : undefined;
      batch(() => {
        setProfiles(name, source ? structuredClone(unwrap(source)) : initialBestiaryState());
        setCurrentName(name);
      });
    },
    editProfile: (newName) => {
      if (newName === currentName()) return;
      if (!newName.trim()) return alert("Введите название профиля");
      if (newName in profiles) return alert(`Профиль с именем "${newName}" уже существует`);
      const renamed = Object.entries(unwrap(profiles)).map(([name, profile]) => [name === currentName() ? newName : name, profile]);
      batch(() => {
        setProfiles(reconcile(Object.fromEntries(renamed)));
        setCurrentName(newName);
      });
    },
    removeProfile: () => {
      const rest = Object.entries(unwrap(profiles)).filter(([name]) => name !== currentName());
      if (rest.length === 0) return alert("Нельзя удалить единственный профиль");
      batch(() => {
        setProfiles(reconcile(Object.fromEntries(rest)));
        setCurrentName(rest[0][0]);
      });
    },
    setCurrentProfile: setCurrentName,
  };
}
