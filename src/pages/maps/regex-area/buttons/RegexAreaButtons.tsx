import { CopyButton } from "./CopyButton";
import { ResetButton } from "./ResetButton";

export function RegexAreaButtons() {
  return (
    <div class={"row gap-3"}>
      <CopyButton />
      <ResetButton />
    </div>
  );
}
