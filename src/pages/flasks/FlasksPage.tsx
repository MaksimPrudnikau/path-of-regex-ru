import { WindowList } from "./card/WindowList";
import { ProfileHeader } from "./ProfileHeader";
import { RegexPanel } from "./regex-panel/RegexPanel";

export function FlasksPage() {
  return (
    <main class="w-full p-4 col gap-4">
      <ProfileHeader />
      <RegexPanel />
      <WindowList />
    </main>
  );
}
