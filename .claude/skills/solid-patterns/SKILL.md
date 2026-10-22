---
name: solid-patterns
description: Паттерны SolidJS 1.9 / SolidStart в этом проекте — компоненты, props, сигналы, сторы, createMemo/createEffect, контексты с провайдерами, makePersisted-профили в localStorage, clientOnly. Используй при написании или правке любого .tsx/.ts в src/ (компоненты, контексты, состояние страницы), при багах «не обновляется UI» и при изменении формы MapsStore.
---

# SolidJS в проекте

Solid — не React. Функция компонента выполняется **один раз**; обновляется не компонент, а конкретные места, где читается сигнал (`count()`, `props.x`, `store.y`). Почти все баги «UI не обновился» — это чтение сигнала вне реактивного контекста.

## Props

- `props` — объект с геттерами. **Не деструктурируй** его в сигнатуре или теле: значение прочитается один раз и замрёт.
  ```tsx
  // плохо — model и max замрут
  export function RangeInput({ model, max }: Props) { … }

  // хорошо
  export function RangeInput(props: ParentProps<Props>) {
    const value = createMemo(() => currentProfile()[props.model]);
    …
  }
  ```
- Дефолты и разбиение — `mergeProps(defaults, props)` и `splitProps(props, ["class"])`.
- В проекте принят второй способ: передавать в пропсы **`Accessor`** (`mods: Accessor<MapMod[]>`, `isSelected: Accessor<boolean>`) и вызывать его внутри. Так тоже можно, но тогда тип пропса — `Accessor<T>`, а в JSX передаётся функция: `<ModList mods={filteredMods} />`, `isChecked={() => currentProfile()[model]}`.
- Старый код деструктурирует props — не переписывай его без задачи, но в новом коде так не делай.

## Производное состояние и эффекты

- Производное значение — `createMemo(() => …)`, а не сигнал + эффект, который его синхронизирует.
- Внутри `createMemo` **не меняй** сигналы и сторы. Memo должен только вычислять значение. В `RegexAreaContextProvider` memo `regex` пишет в `setPrevRegex`, `setErrorMessage` и `updateStore` — так в новом коде не делай: ошибку держи в отдельном memo, который возвращает `{ regex, error }`.
- `createEffect` — только для побочных эффектов наружу: буфер обмена, DOM, `document.title`. Пример — автокопирование в `Context.tsx`.
- Пачку обновлений нескольких сигналов/сторов оборачивай в `batch(() => { … })` (см. `ProfileContextProvider`).

## Сторы

- `createStore` для вложенных объектов, `createSignal` для примитивов.
- Обновление — через сеттер, иммутабельно: `setProfiles(name, value)`, `setStore("copied", true)`, или функция `prev => ({ ...prev, [model]: next })` (так устроен `updateProfile`). Объекты из стора напрямую не мутируй: `list.toSpliced(...)`, `[...list, item]`, а не `push`/`splice`.
- Полная замена коллекции с сохранением идентичности элементов — `reconcile(next)`.
- Нужна обычная копия данных стора (дублирование профиля, сериализация) — `structuredClone(unwrap(store.x))`; без `unwrap` получишь прокси.

## Контексты

Состояние страницы живёт в контексте с провайдером. Структура, как в `src/pages/maps/context/profile/` и `regex-area/context/`:

- `context.ts` — тип и `createContext<Context>({} as unknown as Context)`. Поля контекста — `Accessor`-ы и функции-действия, а не сырые значения: `currentProfile: Accessor<MapsStore>`, `updateProfile(setter)`.
- `Provider.tsx` / `Context.tsx` — `export function XContextProvider(props: ParentProps)` создаёт сигналы/сторы и отдаёт `value={{ … }}`.
- `index.ts` — barrel.
- Потребитель: `const { currentProfile, updateProfile } = useContext(MapsProfileContext);` — деструктуризация **значения контекста** безопасна, потому что его поля — функции.
- Провайдер подключается на странице в `src/routes/*.tsx`, не внутри переиспользуемых компонентов.

## Профили и localStorage

- Профили — `makePersisted(createStore<Profiles>(…), { name: STORAGE_KEY })` из `@solid-primitives/storage`; текущий профиль — отдельный persisted-сигнал `${STORAGE_KEY}:current`.
- У пользователей уже сохранены старые профили. Новое поле `MapsStore`:
  1. добавь в тип и в `initialMapsContextState()`;
  2. читай с запасом (`profile.newField ?? default`) или дополняй старые профили значениями по умолчанию при загрузке в провайдере;
  3. никогда не переименовывай и не удаляй поля и `STORAGE_KEY` без миграции — профили пропадут.
- SSG-страница, которая трогает `localStorage`, `navigator` или `window`, подключается через `clientOnly(async () => ({ default: Page }), { lazy: true })` (см. `src/routes/maps.tsx`): она пререндерится при сборке.
- SSR-страница (с серверными данными, как `/bestiary`) рендерится без `clientOnly`. Стор создаётся с настройками по умолчанию, сохранённое состояние читается из `localStorage` в `onMount`, а запись идёт эффектом только после восстановления (см. `src/pages/bestiary/context/savedState.ts`). `makePersisted` здесь не подходит: он читает хранилище сразу при создании, и первый рендер в браузере расходится с серверным. Первый рендер не должен зависеть от окружения: дату форматируй с явным `timeZone`.

## JSX

- Условия — `<Show when={…} fallback={…}>`, списки объектов — `<For each={…}>`, списки примитивов — `<Index>`, ветвления — `<Switch>/<Match>`. Не `cond && <X/>` и не `.map` в JSX.
- `class` и `classList={{ "text-primary": isActive() }}`, не `className`. Классы — Tailwind + daisyUI (скиллы `daisyui`, `tailwind-4-docs`).
- События: `onInput` для полей ввода (обновление на каждый символ), `onClick`, `onSubmit` с `e.preventDefault()`.
- `ref`: `let form!: HTMLFormElement;` + `ref={form}`.
- Поля моделей стора типизируй через `KeyOfType` из `~/lib/key-of-type`: `model: KeyOfType<MapsStore, ModRange>` — так компонент принимает только подходящие ключи.

## Пример компонента

```tsx
import { createMemo, type ParentProps, Show, useContext } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { MapsProfileContext, type MapsStore } from "~/pages/maps/context";

export function ToggleFilter(props: ParentProps<Props>) {
  const { currentProfile, updateProfile } = useContext(MapsProfileContext);
  const isChecked = createMemo(() => !!currentProfile()[props.model]);

  return (
    <label class="label gap-2">
      <input
        checked={isChecked()}
        class="toggle toggle-primary"
        onChange={() => updateProfile((prev) => ({ ...prev, [props.model]: !isChecked() }))}
        type="checkbox"
      />
      {props.children}
      <Show when={isChecked()}>
        <span class="badge badge-primary">вкл</span>
      </Show>
    </label>
  );
}

type Props = {
  model: KeyOfType<MapsStore, boolean>;
};
```
