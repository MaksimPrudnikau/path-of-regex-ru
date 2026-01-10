import { ProfileDropdown } from "./Dropdown";
import { ProfileButtons } from "./ProfileButtons";

export function Profile() {
  return (
    <div class={"row gap-4 items-center"}>
      <span>Профиль</span>
      <ProfileDropdown />
      <ProfileButtons />
    </div>
  );
}
