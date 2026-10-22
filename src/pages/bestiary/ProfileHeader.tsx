import { useContext } from "solid-js";
import { Profile } from "~/components/profile";
import { BestiaryContext } from "./context";

export function ProfileHeader() {
  return (
    <div class="w-full row justify-between">
      <h2 class="max-[550px]:hidden">Регулярное выражение для поиска зверей:</h2>
      <Profile controls={useContext(BestiaryContext)} />
    </div>
  );
}
