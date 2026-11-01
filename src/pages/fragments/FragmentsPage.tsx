import { ItemColumn } from "./columns/ItemColumn";
import { ProfileHeader } from "./ProfileHeader";
import { RegexPanel } from "./regex-panel/RegexPanel";
import { SelectionPanel } from "./SelectionPanel";
import { TabStrip } from "./TabStrip";

export function FragmentsPage() {
  return (
    <main class="w-full p-4 col gap-4">
      <ProfileHeader />
      <RegexPanel />
      <TabStrip />
      <SelectionPanel />
      <div class="grid gap-8 lg:grid-cols-2">
        <ItemColumn list="include" />
        <ItemColumn list="exclude" />
      </div>
    </main>
  );
}
