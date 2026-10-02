import { clientOnly } from "@solidjs/start";
import { mapMods } from "~/api";
import { HeaderWithProfile, ModsSearchTable, RegexArea } from "~/pages/maps";
import { ProfileContextProvider } from "~/pages/maps/context";
import { FilterPanel } from "~/pages/maps/filter-panel/FilterPanel";

export default clientOnly(async () => ({ default: Maps }), { lazy: true });

function Maps() {
  return (
    <ProfileContextProvider>
      <main class="w-full p-4 space-y-4">
        <HeaderWithProfile />
        <RegexArea />
        <FilterPanel />
        <ModsSearchTable mods={() => mapMods} />
      </main>
    </ProfileContextProvider>
  );
}
