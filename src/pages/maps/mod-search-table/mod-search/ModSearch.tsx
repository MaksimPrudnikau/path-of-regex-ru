import {
  type Accessor,
  createMemo,
  createSignal,
  type JSXElement,
  type ParentProps,
  useContext,
} from "solid-js";
import type { MapMod } from "~/api";
import { MapsProfileContext } from "~/pages/maps/context";
import { ModList } from "./ModList";
import { SearchHeader } from "./SearchHeader";
import { parseModsRegex } from "./parseModsRegex";
import { SearchInput } from "./SearchInput";

type Props = {
  title?: string | JSXElement;
  mods: Accessor<MapMod[]>;
  model: "negativeMods" | "positiveMods";
};

export function ModSearch(props: ParentProps<Props>) {
  const { updateProfile } = useContext(MapsProfileContext);
  const [search, setSearch] = createSignal("");

  const filteredMods = createMemo(() => {
    const predicate = containsMod(search());

    return props.mods().filter(predicate);
  });

  const importRegex = (text: string, event: ClipboardEvent) => {
    const parsed = parseModsRegex(text);

    if (!parsed) {
      return;
    }

    event.preventDefault();
    setSearch("");
    updateProfile((prev) => ({
      ...prev,
      negativeMods: parsed.negativeMods,
      positiveMods: parsed.positiveMods,
      positiveModsType:
        parsed.positiveMods.length > 0 ? parsed.positiveModsType : prev.positiveModsType,
    }));
  };

  return (
    <div class={"col gap-3 items-start w-full min-w-52.5"}>
      <SearchHeader title={props.title}>{props.children}</SearchHeader>
      <SearchInput onPaste={importRegex} setValue={setSearch} value={search} />
      <ModList model={props.model} mods={filteredMods} />
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
