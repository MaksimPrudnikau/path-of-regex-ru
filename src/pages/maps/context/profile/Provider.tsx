import { createSignal, type ParentProps } from "solid-js";
import { initialMapsContextState, type MapsStore } from "~/pages/maps/context";
import { MapsProfileContext, type Profiles } from "./context";

const STORAGE_KEY = "path-of-regex-maps-profiles";

export function ProfileContextProvider(props: ParentProps) {
  const [profiles, setProfiles] = createSignal<Profiles>(initialProfiles());
  const [currentProfile, setCurrentProfile] = createSignal<string>("");

  const addProfile = (name: string, profile: MapsStore) => {
    setProfiles((prev) => {
      const newMap = new Map(prev);
      newMap.set(name, profile);

      return newMap;
    });
  };

  const updateProfile = (name: string, config: { name: string }) => {
    setProfiles((prev) => {
      const newMap = new Map(prev);

      const profile = newMap.get(name);
      newMap.set(config.name, profile);
      newMap.delete(name);

      return newMap;
    });
  };

  const removeProfile = (name: string) => {
    setProfiles((prev) => {
      const newMap = new Map(prev);
      newMap.delete(name);
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
