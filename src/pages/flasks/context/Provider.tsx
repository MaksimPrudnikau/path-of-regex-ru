import { makePersisted } from "@solid-primitives/storage";
import { batch, createMemo, createSignal, type ParentProps, type Signal } from "solid-js";
import { createStore, type SetStoreFunction } from "solid-js/store";
import { createProfileActions } from "~/components/profile";
import { flaskData } from "../data";
import { buildFlaskSearches } from "../regex-panel/buildFlaskSearches";
import { parseFlaskRegex } from "../regex-panel/parseFlaskRegex";
import { emptyWindow, type FlaskWindow, FlasksContext, type FlasksStore, initialFlasksState } from "./context";
import { withTierLists } from "./savedTiers";
import { duplicated, withSelectedBases } from "./windows";

const STORAGE_KEY = "path-of-regex-flasks-profiles";

export function FlasksContextProvider(props: ParentProps) {
  const [profiles, setProfiles] = makePersisted<Profiles, [Profiles, SetStoreFunction<Profiles>]>(
    createStore<Profiles>({ default: initialFlasksState() }),
    { name: STORAGE_KEY },
  );
  const [currentName, setCurrentName] = makePersisted<string, Signal<string>>(createSignal("default"), {
    name: `${STORAGE_KEY}:current`,
  });
  const [searchIndex, setSearchIndex] = createSignal(0);

  const state = createMemo(() => withDefaults(profiles[currentName()]));
  const searches = createMemo(() => buildFlaskSearches(state().windows, flaskData));
  const currentSearch = createMemo(() => Math.max(0, Math.min(searchIndex(), searches().length - 1)));

  const update = (patch: Partial<FlasksStore>) => setProfiles(currentName(), { ...state(), ...patch });
  const setWindows = (windows: FlaskWindow[]) => update({ windows });

  return (
    <FlasksContext.Provider
      value={{
        ...createProfileActions({ currentName, profiles, setCurrentName, setProfiles }, initialFlasksState),
        addWindow: (baseIds) => setWindows([...state().windows, { ...emptyWindow(), bases: baseIds }]),
        currentProfileName: currentName,
        duplicateWindow: (id) => setWindows(duplicated(state().windows, id)),
        importRegex: (text) => {
          const parsed = parseFlaskRegex(text, flaskData);
          if (parsed === undefined) return false;
          batch(() => {
            setSearchIndex(0);
            setWindows(parsed.map((window) => ({ ...emptyWindow(), ...window })));
          });
          return true;
        },
        profileNames: () => Object.keys(profiles),
        regex: () => searches()[currentSearch()] ?? "",
        removeWindow: (id) => setWindows(state().windows.filter((window) => window.id !== id)),
        reset: () => update(initialFlasksState()),
        searches,
        searchIndex: currentSearch,
        selectBases: (id, baseIds, selected) => setWindows(withSelectedBases(state().windows, id, baseIds, selected)),
        setSearchIndex,
        state,
        updateWindow: (id, patch) => setWindows(state().windows.map((window) => (window.id === id ? { ...window, ...patch } : window))),
      }}
    >
      {props.children}
    </FlasksContext.Provider>
  );
}

function withDefaults(saved: Partial<FlasksStore> | undefined): FlasksStore {
  const state = { ...initialFlasksState(), ...saved };
  return { ...state, windows: state.windows.map(withTierLists) };
}

type Profiles = Record<string, FlasksStore>;
