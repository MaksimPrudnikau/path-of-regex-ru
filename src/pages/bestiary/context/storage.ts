import { type BestiaryStore, initialBestiaryState } from "./context";

export const DEFAULT_PROFILE = "default";

export type SavedProfiles = {
  current: string;
  profiles: Record<string, BestiaryStore>;
};

const LEGACY_KEY = "path-of-regex-bestiary";
const STORAGE_KEY = "path-of-regex-bestiary-profiles";

export function readSavedProfiles(): SavedProfiles {
  const saved = readObject(STORAGE_KEY);
  const profiles = isRecord(saved?.profiles) ? withDefaults(saved.profiles) : {};
  if (Object.keys(profiles).length === 0) {
    return { current: DEFAULT_PROFILE, profiles: withDefaults({ [DEFAULT_PROFILE]: readObject(LEGACY_KEY) ?? {} }) };
  }
  const current = typeof saved?.current === "string" && saved.current in profiles ? saved.current : Object.keys(profiles)[0];
  return { current, profiles };
}

export function writeSavedProfiles(serialized: string) {
  try {
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error(`[bestiary] Не удалось сохранить профили в localStorage (${STORAGE_KEY}), они пропадут после перезагрузки`, error);
  }
}

function withDefaults(profiles: Record<string, unknown>): Record<string, BestiaryStore> {
  return Object.fromEntries(
    Object.entries(profiles).map(([name, profile]) => [name, { ...initialBestiaryState(), ...(isRecord(profile) ? profile : {}) }]),
  );
}

function readObject(key: string): Record<string, unknown> | null {
  try {
    const saved = JSON.parse(localStorage.getItem(key) ?? "null");
    return isRecord(saved) ? saved : null;
  } catch (error) {
    console.error(`[bestiary] Не удалось прочитать localStorage (${key}), начинаю с настроек по умолчанию`, error);
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
