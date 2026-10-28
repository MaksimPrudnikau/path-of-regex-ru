import { makePersisted } from "@solid-primitives/storage";
import { createMemo, createSignal, type ParentProps, type Signal } from "solid-js";
import { createStore, type SetStoreFunction } from "solid-js/store";
import { createProfileActions } from "~/components/profile";
import { flaskData } from "../data";
import { buildFlaskRegex } from "../regex-panel/buildFlaskRegex";
import { FlasksContext, type FlasksStore, initialFlasksState } from "./context";

const STORAGE_KEY = "path-of-regex-flasks-profiles";

export function FlasksContextProvider(props: ParentProps) {
  const [profiles, setProfiles] = makePersisted<Profiles, [Profiles, SetStoreFunction<Profiles>]>(
    createStore<Profiles>({ default: initialFlasksState() }),
    { name: STORAGE_KEY },
  );
  const [currentName, setCurrentName] = makePersisted<string, Signal<string>>(createSignal("default"), {
    name: `${STORAGE_KEY}:current`,
  });

  const state = createMemo(() => ({ ...initialFlasksState(), ...profiles[currentName()] }));
  const regex = createMemo(() => buildFlaskRegex(state(), flaskData));

  const update = (patch: Partial<FlasksStore>) => setProfiles(currentName(), { ...state(), ...patch });
  const selectBases = (ids: string[], selected: boolean) => {
    const rest = state().bases.filter((id) => !ids.includes(id));
    update({ bases: selected ? [...rest, ...ids] : rest });
  };
  const setTierCount = (modId: string, tierCount: number | undefined) => {
    const { [modId]: _, ...rest } = state().mods;
    update({ mods: tierCount === undefined ? rest : { ...rest, [modId]: tierCount } });
  };

  return (
    <FlasksContext.Provider
      value={{
        ...createProfileActions({ currentName, profiles, setCurrentName, setProfiles }, initialFlasksState),
        currentProfileName: currentName,
        profileNames: () => Object.keys(profiles),
        regex,
        reset: () => update({ bases: [], mods: {} }),
        selectBases,
        setTierCount,
        state,
        tierCountOf: (modId) => state().mods[modId],
        update,
      }}
    >
      {props.children}
    </FlasksContext.Provider>
  );
}

type Profiles = Record<string, FlasksStore>;
