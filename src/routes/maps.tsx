import type { RouteDefinition } from "@solidjs/router";
import { getMapMods } from "~/api";
import { ModsSearchTable, RegexArea, RegexHeader } from "~/pages/maps";
import { MapsContextProvider } from "~/pages/maps/MapsContextProvider";

export const route = {
  preload() {
    void getMapMods();
  },
} satisfies RouteDefinition;

export default function Maps() {
  return (
    <MapsContextProvider>
      <main class="w-full p-4 space-y-2">
        <RegexHeader />
        <RegexArea />
        <ModsSearchTable />
      </main>
    </MapsContextProvider>
  );
}
