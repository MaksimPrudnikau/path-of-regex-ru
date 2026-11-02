export type TabId = "general" | "scarab" | "allflame" | "eldritch";

export type Tab = {
  id: TabId;
  label: string;
  ninjaType: string;
  accepts: (englishName: string) => boolean;
};

export const TABS: Tab[] = [
  { accepts: () => true, id: "general", label: "Общий", ninjaType: "Fragment" },
  { accepts: () => true, id: "scarab", label: "Скарабей", ninjaType: "Scarab" },
  { accepts: () => true, id: "allflame", label: "Всепламень", ninjaType: "AllflameEmber" },
  { accepts: (name) => /^\w+ Eldritch (Ember|Ichor)$/.test(name), id: "eldritch", label: "Древние сущности", ninjaType: "Currency" },
];

export const NINJA_TYPES = [...new Set(TABS.map((tab) => tab.ninjaType))];
