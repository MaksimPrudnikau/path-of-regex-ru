import { BaseList } from "./bases/BaseList";
import { ModList } from "./mods/ModList";
import { ProfileHeader } from "./ProfileHeader";
import { RegexPanel } from "./regex-panel/RegexPanel";

export function FlasksPage() {
  return (
    <main class="w-full p-4 col gap-4">
      <ProfileHeader />
      <RegexPanel />
      <BaseList />
      <div class="grid gap-8 lg:grid-cols-2">
        <ModList affix="prefix" />
        <ModList affix="suffix" />
      </div>
    </main>
  );
}
