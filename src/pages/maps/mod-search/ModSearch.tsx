import type { ParentProps } from "solid-js";
import type { MapMod } from "~/api";
import { ModList } from "./ModList";
import { SearchHeader } from "./SearchHeader";
import { SearchInput } from "./SearchInput";

type Props = {
  title?: string;
  mods: MapMod[];
};

export function ModSearch(props: ParentProps<Props>) {
  return (
    <div class={"col gap-3 items-start"}>
      <SearchHeader {...props} />
      <SearchInput />
      <ModList mods={props.mods} />
    </div>
  );
}

export type ModSearchProps = ParentProps<Props>;
