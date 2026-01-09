import type { Accessor, Signal } from "solid-js";
import { initialMapsContextState, type MapsStore } from "~/pages/maps/context";
import type { Context, Profiles } from "./context";

export const STORAGE_KEY = "path-of-regex-maps-profiles";

// Изменяем тип Profiles с Map на Record
type SetProfilesFunc = Signal<Profiles>["1"];
type SetCurrentProfileFunc = Signal<string>["1"];

export const addProfile = (
  setProfiles: SetProfilesFunc,
  setCurrentProfile: SetCurrentProfileFunc,
): Context["addProfile"] => {
  return (name: string, duplicateFrom?: string) => {
    setProfiles((prev) => {
      const newProfiles = { ...prev };
      const profile = duplicateFrom
        ? newProfiles[duplicateFrom]
        : initialMapsContextState();

      newProfiles[name] = deepClone(profile);
      setCurrentProfile(name);

      updateStorage(newProfiles);

      return newProfiles;
    });
  };
};

export const editProfile = (
  setProfiles: SetProfilesFunc,
  setCurrentProfile: SetCurrentProfileFunc,
  currentProfile: Accessor<string>,
): Context["editProfile"] => {
  return (name: string) => {
    setProfiles((prev) => {
      const newProfiles = { ...prev };

      const profile = newProfiles[currentProfile()];
      newProfiles[name] = deepClone(profile);
      delete newProfiles[currentProfile()];
      setCurrentProfile(name);

      updateStorage(newProfiles);

      return newProfiles;
    });
  };
};

export const removeProfile = (
  setProfiles: SetProfilesFunc,
  currentProfile: Accessor<string>,
): Context["removeProfile"] => {
  return () => {
    setProfiles((prev) => {
      const newProfiles = { ...prev };
      delete newProfiles[currentProfile()];

      updateStorage(newProfiles);
      return newProfiles;
    });
  };
};

export function updateProfile(
  setProfiles: SetProfilesFunc,
  currentProfile: Accessor<string>,
) {
  return (profile: MapsStore) => {
    setProfiles((prev) => {
      const newProfiles = { ...prev };
      newProfiles[currentProfile()] = profile;
      updateStorage(newProfiles);

      return newProfiles;
    });
  };
}

function updateStorage(profiles: Profiles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
