import { createAsyncStore, type RouteDefinition } from "@solidjs/router";
import { getMapMods } from "~/api";
import { ModsSearchTable, RegexArea, RegexHeader } from "~/pages/maps";
import { MapContextProvider } from "~/pages/maps/context/MapsContext";

export const route = {
  preload() {
    void getMapMods();
  },
} satisfies RouteDefinition;

export default function Maps() {
  const mods = createAsyncStore(async () => getMapMods(), {
    deferStream: true,
  });

  return (
    <MapContextProvider>
      <main class="w-full p-4 space-y-2">
        <RegexHeader />
        <RegexArea />
        <ModsSearchTable mods={mods() ?? []} />
      </main>
    </MapContextProvider>
  );
}
