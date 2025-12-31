import type { ParentProps } from "solid-js";
import { ModList } from "./ModList";
import { SearchHeader } from "./SearchHeader";
import { SearchInput } from "./SearchInput";

type Props = {
  title?: string;
  mods?: Array<unknown>;
};

export function ModSearch(props: ParentProps<Props>) {
  return (
    <div>
      <SearchHeader {...props} />
      <SearchInput />
      <ModList />
    </div>
  );
}

export type ModSearchProps = ParentProps<Props>;
