import { createSignal, onMount, type ParentProps } from "solid-js";
import { initialMapsContextState } from "~/pages/maps/context";
import { addProfile, removeProfile, syncWithLocalStorage, updateProfile } from "~/pages/maps/context/profile/lib";
import { MapsProfileContext, type Profiles } from "./context";

export function ProfileContextProvider(props: ParentProps) {
  const [profiles, setProfiles] = createSignal<Profiles>(
    new Map([["default", initialMapsContextState()]]),
  );
  const [currentProfile, setCurrentProfile] = createSignal<string>("default");

  onMount(syncWithLocalStorage(setProfiles, setCurrentProfile));

  return (
    <MapsProfileContext.Provider
      value={{
        addProfile: addProfile(setProfiles, setCurrentProfile),
        currentProfile,
        profiles,
        removeProfile: removeProfile(setProfiles, currentProfile),
        setCurrentProfile,
        updateProfile: updateProfile(setProfiles, setCurrentProfile, currentProfile),
      }}
    >
      {props.children}
    </MapsProfileContext.Provider>
  );
}
