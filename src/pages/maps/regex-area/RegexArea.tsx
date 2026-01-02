import { RegexAreaContextProvider } from "~/pages/maps/regex-area/Context";
import { RegexAreaButtons } from "./RegexAreaButtons";
import { RegexValue } from "./RegexValue";

export function RegexArea() {
  return (
    <RegexAreaContextProvider>
      <div class={"p- col gap-3 bg-base-200 w-full p-5 rounded-2xl"}>
        <RegexValue />
        <RegexAreaButtons />
      </div>
    </RegexAreaContextProvider>
  );
}
