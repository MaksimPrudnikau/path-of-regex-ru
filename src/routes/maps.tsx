import type { RouteDefinition } from "@solidjs/router";
import { ModsSearchTable, RegexArea, RegexHeader } from "~/pages/maps";

export const route = {} satisfies RouteDefinition;

export default function Maps() {
  return (
    <main class="w-full p-4 space-y-2">
      <RegexHeader />
      <RegexArea />
      <ModsSearchTable />
    </main>
  );
}
