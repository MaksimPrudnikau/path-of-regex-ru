import fragments from "@/data/fragments.json";
import type { TabId } from "./tabs";

export type FragmentItem = {
  id: string;
  name: string;
  regex: string;
  icon: string;
  tab: TabId;
};

export const items = fragments.items as FragmentItem[];

export const itemById = new Map(items.map((item) => [item.id, item]));
