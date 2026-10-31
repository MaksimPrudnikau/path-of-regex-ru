import { type Accessor, createContext } from "solid-js";

export type Context = {
  regex: Accessor<string>;
  errorMessage: Accessor<string | undefined>;
};

export const RegexAreaContext = createContext<Context>({} as unknown as Context);
