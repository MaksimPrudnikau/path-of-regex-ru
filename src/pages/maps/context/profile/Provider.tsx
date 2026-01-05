import { createSignal, type ParentProps } from "solid-js";
import { initialMapsContextState, type MapsStore } from "~/pages/maps/context";
import { type Context, MapsProfileContext, type Profiles } from "./context";

const STORAGE_KEY = "path-of-regex-maps-profiles";

export function ProfileContextProvider(props: ParentProps) {
  const [profiles, setProfiles] = createSignal<Profiles>(initialProfiles());
  const [currentProfile, setCurrentProfile] = createSignal<string>("default");

  const addProfile: Context["addProfile"] = (name: string, duplicateFrom?: string) => {
    setProfiles((prev) => {
      const newMap = new Map(prev);
      const profile: MapsStore = duplicateFrom
        ? newMap.get(duplicateFrom)!
        : initialMapsContextState();

      newMap.set(name, profile);
      setCurrentProfile(name);

      return newMap;
    });
  };

  const updateProfile: Context["updateProfile"] = (name: string) => {
    setProfiles((prev) => {
      const newMap = new Map(prev);

      const profile = newMap.get(name);
      newMap.set(currentProfile(), profile);
      newMap.delete(name);

      return newMap;
    });
  };

  const removeProfile: Context["removeProfile"] = () => {
    setProfiles((prev) => {
      const newMap = new Map(prev);
      newMap.delete(currentProfile());
      return newMap;
    });
  };

  return (
    <MapsProfileContext.Provider
      value={{
        addProfile,
        currentProfile,
        profiles,
        removeProfile,
        setCurrentProfile,
        updateProfile,
      }}
    >
      {props.children}
    </MapsProfileContext.Provider>
  );
}

function initialProfiles(): Profiles {
  const initialMap = new Map();
  initialMap.set("default", initialMapsContextState());

  if (typeof window === "undefined") {
    return initialMap;
  }

  const storage = localStorage.getItem(STORAGE_KEY);

  if (!storage) {
    return initialMap;
  }

  try {
    return JSON.parse(storage);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return initialMap;
  }
}
