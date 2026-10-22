import { useContext } from "solid-js";
import { Profile } from "~/components/profile";
import { MapsProfileContext } from "~/pages/maps/context";

export function HeaderWithProfile() {
  return (
    <div class={"w-full row justify-between"}>
      <h2 class={"max-[550px]:hidden"}>Регулярное выражение для поиска карт:</h2>
      <Profile controls={useContext(MapsProfileContext)} />
    </div>
  );
}
