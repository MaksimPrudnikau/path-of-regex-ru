import { Profile } from "./Profile/Profile";

export function HeaderWithProfile() {
  return (
    <div class={"w-full row justify-between"}>
      <h2 class={"max-[550px]:hidden"}>Регулярное выражение для поиска карт:</h2>
      <Profile />
    </div>
  );
}
