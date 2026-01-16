import { createAsyncStore, type RouteDefinition } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { getMapMods } from "~/api";
import { HeaderWithProfile, ModsSearchTable, RegexArea } from "~/pages/maps";
import { ProfileContextProvider } from "~/pages/maps/context";
import { FilterPanel } from "~/pages/maps/filter-panel/FilterPanel";

export const route = {
  preload() {
    getMapMods();
  },
} satisfies RouteDefinition;

export default clientOnly(async () => ({ default: Maps }), { lazy: true });

function Maps() {
  const mods = createAsyncStore(async () => getMapMods());

  const modsAccessor = () => mods() ?? [];

  return (
    <ProfileContextProvider>
      <main class="w-full p-4 space-y-4">
        <HeaderWithProfile />
        <RegexArea />
        <FilterPanel />
        <ModsSearchTable mods={modsAccessor} />
      </main>
    </ProfileContextProvider>
  );
}
