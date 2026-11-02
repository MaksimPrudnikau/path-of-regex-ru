import { useContext } from "solid-js";
import { Profile } from "~/components/profile";
import { FragmentsContext } from "./context";

export function ProfileHeader() {
  return (
    <div class="relative z-20 w-full row justify-between">
      <h2 class="max-[550px]:hidden">Регулярное выражение для поиска фрагментов:</h2>
      <Profile controls={useContext(FragmentsContext)} />
    </div>
  );
}
