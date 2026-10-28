import { clientOnly } from "@solidjs/start";
import { FlasksContextProvider, FlasksPage } from "~/pages/flasks";

export default clientOnly(async () => ({ default: Flasks }), { lazy: true });

function Flasks() {
  return (
    <FlasksContextProvider>
      <FlasksPage />
    </FlasksContextProvider>
  );
}
