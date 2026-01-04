import { type Accessor, createMemo, createSignal } from "solid-js";
import type { MapMod } from "~/api";
import { NegativeModSearch } from "./NegativeModSearch";
import { PositiveModSearch } from "./PositiveModSearch";

type Props = {
  mods: Accessor<MapMod[]>;
};

export function ModsSearchTable({ mods }: Props) {
  const [showT17, setShowT17] = createSignal(false);

  const filteredMods = createMemo(() =>
    mods().filter((mod) => (showT17() ? true : mod.rank < 700)),
  );
  return (
    <div class={"space-y-8"}>
      <div>
        <div class={"row gap-2"}>
          <input
            checked={showT17()}
            class={`checkbox checkbox-accent rounded-md`}
            onChange={() => setShowT17((prev) => !prev)}
            type="checkbox"
          />
          <span class={"text-accent"}>Показать модификаторы Т17 карт</span>
        </div>
      </div>
      <div class={"w-full grid grid-cols-2 grid-rows-1 gap-10"}>
        <NegativeModSearch mods={filteredMods} />
        <PositiveModSearch mods={filteredMods} />
      </div>
    </div>
  );
}
