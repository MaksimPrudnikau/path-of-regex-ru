import { type Accessor, createMemo, createSignal, type ParentProps, } from "solid-js";
import type { MapMod } from "~/api";
import { ModList } from "./ModList";
import { SearchHeader } from "./SearchHeader";
import { SearchInput } from "./SearchInput";

type Props = {
  title?: string;
  mods: Accessor<MapMod[]>;
  model: "negativeMods" | "positiveMods";
};

export function ModSearch(props: ParentProps<Props>) {
  const [search, setSearch] = createSignal("");

  const filteredMods = createMemo(() => {
    const predicate = containsMod(search());

    return props.mods().filter(predicate);
  });

  return (
    <div class={"col gap-3 items-start"}>
      <SearchHeader title={props.title}>{props.children}</SearchHeader>
      <SearchInput setValue={setSearch} value={search()} />
      <ModList model={props.model} mods={filteredMods()} />
    </div>
  );
}

function containsMod(search: string) {
  return (mod: MapMod) => {
    if (search.length < 1) {
      return true;
    }

    return mod.name.toLowerCase().includes(search);
  };
}
