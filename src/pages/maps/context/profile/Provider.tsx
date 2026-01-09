import { makePersisted } from "@solid-primitives/storage";
import { createMemo, createSignal, type ParentProps } from "solid-js";
import { createStore } from "solid-js/store";
import { initialMapsContextState, type MapsStore, type Profiles, } from "~/pages/maps/context";
import { addProfile, editProfile, removeProfile, STORAGE_KEY, } from "~/pages/maps/context/profile/lib";
import { MapsProfileContext } from "./context";

export function ProfileContextProvider(props: ParentProps) {
  const [profiles, setProfiles] = makePersisted(
    createStore<Profiles>({ default: initialMapsContextState() }),
    { name: STORAGE_KEY },
  );
  const [currentProfileName, setCurrentProfileName] = makePersisted(
    createSignal<string>("default"),
  );

  const currentProfile = createMemo(() =>
    profiles ? profiles[currentProfileName()]! : initialMapsContextState(),
  );

  const updateProfile = (setter: (prev: MapsStore) => MapsStore) => {
    setProfiles(currentProfileName(), setter);
  };

  return (
    <MapsProfileContext.Provider
      value={{
        addProfile: addProfile(setProfiles, setCurrentProfileName),
        currentProfile,
        currentProfileName,
        editProfile: editProfile(setProfiles, setCurrentProfileName, currentProfileName),
        profiles,
        removeProfile: removeProfile(setProfiles, currentProfileName),
        setCurrentProfile: setCurrentProfileName,
        updateProfile,
      }}
    >
      {props.children}
    </MapsProfileContext.Provider>
  );
}
