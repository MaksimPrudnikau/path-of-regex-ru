/// <reference types="@solidjs/start/env" />

declare module "virtual:map-mods" {
  const mods: import("~/api").MapMod[];
  export default mods;
}
