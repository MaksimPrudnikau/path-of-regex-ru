import type { Accessor, Signal } from "solid-js";
import { initialMapsContextState, type MapsStore } from "~/pages/maps/context";
import type { Context, Profiles } from "./context";

const STORAGE_KEY = "path-of-regex-maps-profiles";

type SetProfilesFunc = Signal<Profiles>["1"];
type SetCurrentProfileFunc = Signal<string>["1"];

export const addProfile = (
  setProfiles: SetProfilesFunc,
  setCurrentProfile: SetCurrentProfileFunc,
): Context["addProfile"] => {
  return (name: string, duplicateFrom?: string) => {
    setProfiles((prev) => {
      const newMap = new Map(prev);
      const profile: MapsStore = duplicateFrom
        ? newMap.get(duplicateFrom)!
        : initialMapsContextState();

      newMap.set(name, deepClone(profile));
      setCurrentProfile(name);

      updateStorage(newMap);

      return newMap;
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
      const newMap = new Map(prev);

      const profile = newMap.get(currentProfile());
      newMap.set(name, deepClone(profile));
      newMap.delete(currentProfile());
      setCurrentProfile(name);

      updateStorage(newMap);

      return newMap;
    });
  };
};

export const removeProfile = (
  setProfiles: SetProfilesFunc,
  currentProfile: Accessor<string>,
): Context["removeProfile"] => {
  return () => {
    setProfiles((prev) => {
      const newMap = new Map(prev);
      newMap.delete(currentProfile());

      updateStorage(newMap);
      return newMap;
    });
  };
};

export function syncWithLocalStorage(
  setProfiles: SetProfilesFunc,
  setCurrentProfile: SetCurrentProfileFunc,
): () => void {
  return () => {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (!storage) {
      return;
    }

    try {
      const storageMap = new Map(JSON.parse(storage)) as Profiles;
      setProfiles(storageMap);

      const firstKey = Array.from(storageMap.keys())[0];
      if (firstKey) {
        setCurrentProfile(firstKey);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  };
}

export function updateProfile(
  setProfiles: SetProfilesFunc,
  currentProfile: Accessor<string>,
) {
  return (profile: MapsStore) => {
    setProfiles((prev) => {
      const newMap = new Map(prev);

      newMap.set(currentProfile(), profile);
      updateStorage(newMap);

      return newMap;
    });
  };
}

function updateStorage(profiles: Profiles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(profiles.entries())));
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
