import { RegexAreaButtons } from "./RegexAreaButtons";
import { RegexValue } from "./RegexValue";

export function RegexArea() {
  return (
    <div class={"bg-base-200 w-full py-2"}>
      <RegexValue />
      <RegexAreaButtons />
    </div>
  );
}
