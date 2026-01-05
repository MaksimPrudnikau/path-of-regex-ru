import { createEffect, createMemo, createSignal, type ParentProps, useContext, } from "solid-js";
import { createStore } from "solid-js/store";
import { MapsContext } from "~/pages/maps/context/maps";
import { buildRegex } from "./buildRegex";
import { RegexAreaContext } from "./regexAreaContext";

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
