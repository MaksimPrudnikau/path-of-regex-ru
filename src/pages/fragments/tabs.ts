export type TabId = "general" | "scarab" | "allflame" | "eldritch";

export type Tab = {
  id: TabId;
  label: string;
  iconItem: string;
  ninjaType: string;
  accepts: (englishName: string) => boolean;
};

export const TABS: Tab[] = [
  { accepts: () => true, iconItem: "mid", id: "general", label: "Общий", ninjaType: "Fragment" },
  { accepts: () => true, iconItem: "breach-scarab", id: "scarab", label: "Скарабей", ninjaType: "Scarab" },
  { accepts: () => true, iconItem: "allflame-ember-of-the-gilded", id: "allflame", label: "Всепламень", ninjaType: "AllflameEmber" },
  {
    accepts: (name) => /^\w+ Eldritch (Ember|Ichor)$/.test(name),
    iconItem: "exceptional-eldritch-ember",
    id: "eldritch",
    label: "Древние сущности",
    ninjaType: "Currency",
  },
];

export const NINJA_TYPES = [...new Set(TABS.map((tab) => tab.ninjaType))];
