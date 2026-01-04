import { createAsyncStore, type RouteDefinition } from "@solidjs/router";
import { getMapMods } from "~/api";
import { HeaderWithProfile, ModsSearchTable, RegexArea } from "~/pages/maps";
import { MapContextProvider } from "~/pages/maps/context/MapsContext";
import { FilterPanel } from "~/pages/maps/filter-panel/FilterPanel";

export const route = {
  preload() {
    getMapMods();
  },
} satisfies RouteDefinition;

export default function Maps() {
  const mods = createAsyncStore(async () => getMapMods());

  const modsAccessor = () => mods() ?? [];

  return (
    <MapContextProvider>
      <main class="w-full p-4 space-y-4">
        <HeaderWithProfile />
        <RegexArea />
        <FilterPanel />
        <ModsSearchTable mods={modsAccessor} />
      </main>
    </MapContextProvider>
  );
}
