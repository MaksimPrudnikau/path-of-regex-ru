import type { Accessor, Signal } from "solid-js";
import { initialMapsContextState } from "~/pages/maps/context";
import type { Context, Profiles } from "./context";

export const STORAGE_KEY = "path-of-regex-maps-profiles";

type SetProfilesFunc = Signal<Profiles>["1"];
type SetCurrentProfileFunc = Signal<string>["1"];

export const addProfile = (
  setProfiles: SetProfilesFunc,
  setCurrentProfile: SetCurrentProfileFunc,
): Context["addProfile"] => {
  return (name: string, duplicateFrom?: string) => {
    setProfiles((prev) => {
      if (Object.keys(prev).includes(name)) {
        alert(`Профиль "${name}" уже существует`);
        return prev;
      }

      const newProfiles = { ...prev };

      newProfiles[name] = duplicateFrom
        ? newProfiles[duplicateFrom]
        : initialMapsContextState();

      setCurrentProfile(name);

      return newProfiles;
    });
  };
};

export const editProfile = (
  setProfiles: SetProfilesFunc,
  setCurrentProfile: SetCurrentProfileFunc,
  currentProfile: Accessor<string>,
): Context["editProfile"] => {
  return (newName: string) => {
    const oldName = currentProfile();

    if (oldName === newName) {
      return;
    }

    setProfiles((prev) => {
      if (prev[newName]) {
        alert(`Профиль "${newName}" уже существует`);
        return prev;
      }

      const newProfiles: Profiles = {};

      // Копируем все профили кроме старого
      for (const key in prev) {
        if (key !== oldName) {
          newProfiles[key] = prev[key];
        }
      }

      // Добавляем переименованный профиль
      if (prev[oldName]) {
        newProfiles[newName] = { ...prev[oldName] }; // глубокая копия желательна
      }

      return newProfiles;
    });

    // Обновляем текущий профиль ПОСЛЕ обновления profiles
    setCurrentProfile(newName);
  };
};
