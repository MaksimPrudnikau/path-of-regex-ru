import { type FragmentsStore, initialFragmentsState } from "./context";

export const DEFAULT_PROFILE = "default";

export type SavedProfiles = {
  current: string;
  profiles: Record<string, FragmentsStore>;
};

const STORAGE_KEY = "path-of-regex-fragments-profiles";

export function readSavedProfiles(): SavedProfiles {
  const saved = readObject();
  const profiles = isRecord(saved?.profiles) ? withDefaults(saved.profiles) : {};
  if (Object.keys(profiles).length === 0) return { current: DEFAULT_PROFILE, profiles: withDefaults({ [DEFAULT_PROFILE]: {} }) };
  const current = typeof saved?.current === "string" && saved.current in profiles ? saved.current : Object.keys(profiles)[0];
  return { current, profiles };
}

export function writeSavedProfiles(serialized: string) {
  try {
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error(`[fragments] Не удалось сохранить профили в localStorage (${STORAGE_KEY}), они пропадут после перезагрузки`, error);
  }
}

function withDefaults(profiles: Record<string, unknown>): Record<string, FragmentsStore> {
  const initial = initialFragmentsState();
  return Object.fromEntries(
    Object.entries(profiles).map(([name, profile]) => {
      const saved = isRecord(profile) ? profile : {};
      const selections = isRecord(saved.selections) ? saved.selections : {};
      return [name, { ...initial, ...saved, selections: { ...initial.selections, ...selections } }];
    }),
  );
}

function readObject(): Record<string, unknown> | null {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    return isRecord(saved) ? saved : null;
  } catch (error) {
    console.error(`[fragments] Не удалось прочитать localStorage (${STORAGE_KEY}), начинаю с настроек по умолчанию`, error);
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
