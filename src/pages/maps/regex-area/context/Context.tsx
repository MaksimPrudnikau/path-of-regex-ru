import { createMemo, createSignal, type ParentProps, useContext } from "solid-js";
import { MapsProfileContext } from "~/pages/maps/context";
import { buildRegex } from "./buildRegex";
import { RegexAreaContext } from "./regexAreaContext";

export function RegexAreaContextProvider(props: ParentProps) {
  const { currentProfile } = useContext(MapsProfileContext);
  const [errorMessage, setErrorMessage] = createSignal<string>();
  const [prevRegex, setPrevRegex] = createSignal<string>("");

  const regex = createMemo((): string => {
    try {
      const newRegex = buildRegex(currentProfile());
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

  return (
    <RegexAreaContext.Provider value={{ errorMessage, regex }}>
      {props.children}
    </RegexAreaContext.Provider>
  );
}
