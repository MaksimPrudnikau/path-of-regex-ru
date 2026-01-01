import { createAsyncStore } from "@solidjs/router";
import { createContext, type ParentProps } from "solid-js";
import { createStore, type SetStoreFunction } from "solid-js/store";
import { getMapMods, type MapMod } from "~/api";

type Store = {
  includeT17: boolean;
  maps: MapMod[];
  selectedMods: MapMod["id"][];
};
type Props = {
  store: Store;
  setStore: SetStoreFunction<Store>;
  addMap: (id: MapMod["id"]) => void;
};

export const MapsContext = createContext<Props>({} as unknown as Props);

export function MapsContextProvider(props: ParentProps) {
  const maps = createAsyncStore(async () => getMapMods(), {
    deferStream: true,
  });

  const [mapsStore, setMapsStore] = createStore<Store>({
    includeT17: false,
    maps: maps() ?? [],
    selectedMods: [],
  });

  const addMap = (id: MapMod["id"]) => {
    const setter = addOrRemove(id);
    setMapsStore("selectedMods", setter);
  };

  return (
    <MapsContext.Provider
      value={{ addMap, setStore: setMapsStore, store: mapsStore }}
    >
      {props.children}
    </MapsContext.Provider>
  );
}

function addOrRemove(id: number) {
  return (mods: number[]) => {
    let newMods = [...mods];

    const exists = mods.indexOf(id);
    if (exists > -1) {
      newMods = newMods.splice(exists, 1);
    } else {
      newMods.push(id);
    }

    return newMods;
  };
}
