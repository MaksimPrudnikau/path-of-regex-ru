import { CopyButton } from "~/pages/maps/regex-area/CopyButton";
import { ResetButton } from "~/pages/maps/regex-area/ResetButton";

export function RegexAreaButtons() {
  return (
    <div class={"row gap-3"}>
      <CopyButton />
      <ResetButton />
    </div>
  );
}
