import { NegativeModSearch } from "./NegativeModSearch";
import { PositiveModSearch } from "./PositiveModSearch";

export function ModsSearchTable() {
  return (
    <div class={"w-full grid grid-cols-2 grid-rows-1 gap-10"}>
      <PositiveModSearch />
      <NegativeModSearch />
    </div>
  );
}
