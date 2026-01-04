import { type Accessor, createContext } from "solid-js";
import type { SetStoreFunction } from "solid-js/store";

type Store = {
  copied: Accessor<boolean>;
  autoCopy: Accessor<boolean>;
  errorMessage: Accessor<string | undefined>;
};

export type Context = {
  regex: Accessor<string>;
  updateStore: SetStoreFunction<{ copied: boolean; autoCopy: boolean }>;
} & Store;

export const RegexAreaContext = createContext<Context>(
  {} as unknown as Context,
);
