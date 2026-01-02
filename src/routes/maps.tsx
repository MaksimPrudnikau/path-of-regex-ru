import { createAsyncStore, type RouteDefinition } from "@solidjs/router";
import { getMapMods } from "~/api";
import { ModsSearchTable, RegexArea, RegexHeader } from "~/pages/maps";
import { MapContextProvider } from "~/pages/maps/context/MapsContext";
import { MapRequirements } from "~/pages/maps/map-requirements/MapRequirements";

export const route = {
  preload() {
    getMapMods();
  },
} satisfies RouteDefinition;

export default function Maps() {
  const mods = createAsyncStore(async () => {
    const mods = await getMapMods();
    return mods ?? [];
  });

  return (
    <MapContextProvider>
      <main class="w-full p-4 space-y-4">
        <RegexHeader />
        <RegexArea />
        <MapRequirements />
        <ModsSearchTable mods={mods} />
      </main>
    </MapContextProvider>
  );
}
