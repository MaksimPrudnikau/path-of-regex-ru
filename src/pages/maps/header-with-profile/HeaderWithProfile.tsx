import { Profile } from "./Profile";

export function HeaderWithProfile() {
  return (
    <div class={"w-full row justify-between"}>
      <h2>Регулярное выражение для модификаторов:</h2>
      <Profile />
    </div>
  );
}
