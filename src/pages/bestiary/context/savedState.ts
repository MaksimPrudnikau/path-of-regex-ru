import { createEffect, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { type BestiaryStore, initialBestiaryState } from "./context";

const STORAGE_KEY = "path-of-regex-bestiary";

export function createSavedState() {
  const [store, setStore] = createStore<BestiaryStore>(initialBestiaryState());
  const [isRestored, setIsRestored] = createSignal(false);

  onMount(() => {
    setStore({ ...initialBestiaryState(), ...readSavedState() });
    setIsRestored(true);
  });

  createEffect(() => {
    const serialized = JSON.stringify(store);
    if (isRestored()) writeSavedState(serialized);
  });

  return [store, setStore] as const;
}

function readSavedState(): Partial<BestiaryStore> {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    return typeof saved === "object" && saved !== null ? saved : {};
  } catch (error) {
    console.error(`[bestiary] Не удалось прочитать сохранённый выбор из localStorage (${STORAGE_KEY}), начинаю с настроек по умолчанию`, error);
    return {};
  }
}

function writeSavedState(serialized: string) {
  try {
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error(`[bestiary] Не удалось сохранить выбор в localStorage (${STORAGE_KEY}), он пропадёт после перезагрузки`, error);
  }
}
