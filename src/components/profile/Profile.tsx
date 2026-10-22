import { ProfileControlsContext, type ProfileControls } from "./context";
import { ProfileDropdown } from "./Dropdown";
import { ProfileButtons } from "./ProfileButtons";

export function Profile(props: { controls: ProfileControls }) {
  return (
    <ProfileControlsContext.Provider value={props.controls}>
      <div class={"row gap-4 items-center"}>
        <span>Профиль</span>
        <ProfileDropdown />
        <ProfileButtons />
      </div>
    </ProfileControlsContext.Provider>
  );
}
