import {
    type Accessor,
    createContext,
    createEffect,
    createMemo,
    createSignal,
    type ParentProps,
    useContext,
} from "solid-js";
import { createStore, type SetStoreFunction } from "solid-js/store";
import { MapsContext } from "~/pages/maps/context/context";
import { buildRegex } from "~/pages/maps/regex-area/buildRegex";

type Store = {
  copied: Accessor<boolean>;
  autoCopy: Accessor<boolean>;
  errorMessage: Accessor<string | undefined>;
};

type Context = {
  regex: Accessor<string>;
  updateStore: SetStoreFunction<{ copied: boolean; autoCopy: boolean }>;
} & Store;

export const RegexAreaContext = createContext<Context>(
  {} as unknown as Context,
);

export function RegexAreaContextProvider(props: ParentProps) {
  const { store: mapsStore } = useContext(MapsContext);
  const [errorMessage, setErrorMessage] = createSignal<string>();

  const [store, updateStore] = createStore({
    autoCopy: false,
    copied: false,
  });

  const [prevRegex, setPrevRegex] = createSignal<string>("");

  const regex = createMemo((): string => {
    if (!store.autoCopy) {
      updateStore("copied", false);
    }

    try {
      const newRegex = buildRegex(mapsStore);
      setPrevRegex(newRegex);
      setErrorMessage();
      return newRegex;
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }

      return prevRegex();
    }
  });

  createEffect(async () => {
    if (!store.autoCopy) {
      return;
    }

    await navigator.clipboard.writeText(regex());
    updateStore("copied", true);
  });

  return (
    <RegexAreaContext.Provider
      value={{
        autoCopy: () => store.autoCopy,
        copied: () => store.copied,
        errorMessage,
        regex,
        updateStore,
      }}
    >
      {props.children}
    </RegexAreaContext.Provider>
  );
}
