import { createEffect, on, type ParentProps, useContext } from "solid-js";
import { createStore } from "solid-js/store"; // важно!
import { MapsProfileContext } from "~/pages/maps/context/profile/context";
import { MapsContext, type MapsStore } from "./context";

// Глубокое клонирование (простой способ для JSON-совместимых данных)
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function MapContextProvider(props: ParentProps) {
  const { profiles, currentProfile, updateProfile } = useContext(MapsProfileContext);

  const getCurrentState = (): MapsStore => {
    const state = profiles().get(currentProfile())!;
    return deepClone(state); // ← КЛЮЧЕВОЕ ИЗМЕНЕНИЕ
  };

  const [store, setStore] = createStore<MapsStore>(getCurrentState());

  // При смене профиля — полностью пересоздаём store из чистой копии
  createEffect(
    on(currentProfile, (newProfile) => {
      const newState = profiles().get(newProfile);
      if (newState) {
        setStore(deepClone(newState)); // полная изоляция
      }
    }),
  );

  createEffect(() => {
    JSON.stringify(store);

    updateProfile(deepClone(store));
  });

  return (
    <MapsContext.Provider value={{ store, updateStore: setStore }}>
      {props.children}
    </MapsContext.Provider>
  );
}
