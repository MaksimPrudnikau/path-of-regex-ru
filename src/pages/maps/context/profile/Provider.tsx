import { makePersisted } from "@solid-primitives/storage";
import { batch, createMemo, createSignal, type ParentProps, Show } from "solid-js";
import { createStore, reconcile, unwrap } from "solid-js/store";
import { isServer } from "solid-js/web";
import {
  initialMapsContextState,
  type MapsStore,
  type Profiles,
} from "~/pages/maps/context";
import { STORAGE_KEY } from "~/pages/maps/context/profile/lib";
import { MapsProfileContext } from "./context";

export function ProfileContextProvider(props: ParentProps) {
  const [profiles, setProfiles] = makePersisted(
    createStore<Profiles>({ default: initialMapsContextState() }),
    { name: STORAGE_KEY },
  );
  const [currentProfileName, setCurrentProfileName] = makePersisted(
    createSignal<string>("default"),
    { name: `${STORAGE_KEY}:current` },
  );

  const currentProfile = createMemo(
    () => profiles?.[currentProfileName()] ?? initialMapsContextState(),
  );

  const updateProfile = (setter: (prev: MapsStore) => MapsStore) => {
    setProfiles(currentProfileName(), setter);
  };

  return (
    <MapsProfileContext.Provider
      value={{
        addProfile: (name: string, duplicateFrom?: string) => {
          if (name in profiles) {
            alert(`Профиль с именем "${name}" уже существует`);
            return;
          }

          if (duplicateFrom && !(duplicateFrom in profiles)) {
            alert(`Профиль с именем "${duplicateFrom}" не найден`);
            return;
          }

          const unwrappedProfiles = unwrap(profiles);

          const newProfile = duplicateFrom
            ? unwrappedProfiles[duplicateFrom]
            : initialMapsContextState();

          batch(() => {
            setProfiles(name, JSON.parse(JSON.stringify(newProfile)));
            setCurrentProfileName(name);
          });
        },
        currentProfile,
        currentProfileName,
        editProfile: (newName: string) => {
          if (newName in profiles) {
            alert(`Профиль с именем "${newName}" уже существует`);
            return;
          }

          const unwrappedProfiles = unwrap(profiles);
          const unwrappedProfile = profiles[currentProfileName()];

          const { [currentProfileName()]: _, ...rest } = unwrappedProfiles;
          rest[newName] = unwrappedProfile;

          batch(() => {
            setProfiles(reconcile(rest));
            setCurrentProfileName(newName);
          });
        },
        profiles,
        removeProfile: () => {
          const profileNames = Object.keys(profiles);

          if (profileNames.length < 2) {
            alert("Нельзя удалить единственный профиль");
            return;
          }

          const { [currentProfileName()]: _, ...rest } = profiles;

          const newName = Object.keys(rest)[0];

          batch(() => {
            setProfiles(reconcile(rest));
            setCurrentProfileName(newName);
          });
        },
        setCurrentProfile: setCurrentProfileName,
        updateProfile,
      }}
    >
      {props.children}
    </MapsProfileContext.Provider>
  );
}
