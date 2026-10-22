import { BeastList } from "./beasts/BeastList";
import { SelectionPanel } from "./filters/SelectionPanel";
import { ProfileHeader } from "./ProfileHeader";
import { RecipeList } from "./recipes/RecipeList";
import { RegexPanel } from "./regex-panel/RegexPanel";
import { SearchInput } from "./SearchInput";

export function BestiaryPage() {
  return (
    <main class="w-full p-4 col gap-4">
      <ProfileHeader />
      <RegexPanel />
      <SelectionPanel />
      <SearchInput />
      <div class="grid gap-8 lg:grid-cols-2">
        <RecipeList />
        <BeastList />
      </div>
    </main>
  );
}
