import { type Accessor, createContext, createEffect, createMemo, type ParentProps, useContext, } from "solid-js";
import { createStore, type SetStoreFunction } from "solid-js/store";
import { MapsContext } from "~/pages/maps/context/context";

type Store = {
  copied: Accessor<boolean>;
  autoCopy: Accessor<boolean>;
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

  const [store, updateStore] = createStore({
    autoCopy: false,
    copied: false,
  });

  const regex = createMemo(() => {
    if (!store.autoCopy) {
      updateStore("copied", false);
    }

    const positive = mapsStore.positiveMods.map((x) => x.regex).join("|");
    const negative = mapsStore.negativeMods.map((x) => x.regex).join("|");

    const resultArray: string[] = [];

    if (mapsStore.negativeMods.length > 0) {
      resultArray.push(`"!${negative}"`);
    }

    if (mapsStore.positiveMods.length > 0) {
      resultArray.push(`"${positive}"`);
    }

    return resultArray.join(" ");
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
        regex,
        updateStore,
      }}
    >
      {props.children}
    </RegexAreaContext.Provider>
  );
}
