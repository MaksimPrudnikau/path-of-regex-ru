import { RegexAreaContextProvider } from "~/pages/maps/regex-area/context";
import { RegexAreaPanel } from "./RegexAreaPanel";

export function RegexArea() {
  return (
    <RegexAreaContextProvider>
      <RegexAreaPanel />
    </RegexAreaContextProvider>
  );
}
