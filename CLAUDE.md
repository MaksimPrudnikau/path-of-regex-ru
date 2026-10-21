# CLAUDE.md

## Обязательный порядок работы

Перед **любым** действием (ответ на вопрос о коде, правка, рефакторинг, добавление фичи, отладка) выполняй два шага:

1. **Проверь скиллы.** Сверь задачу с таблицей ниже. Если хотя бы один скилл подходит — вызови его через `Skill` **до** чтения/написания кода и следуй его инструкциям. Если подходят несколько — загрузи все подходящие. Если ни один не подходит — явно отметь это для себя и продолжай.
2. **Ищи код через граф, если он есть.** Если в корне появился `.codegraph/` — сначала `codegraph_explore` (или `codegraph explore "<символы или вопрос>"` в shell), и только потом `Grep`/`Read`. Без индекса — обычные `Grep`/`Read`. Перед правкой посмотри, кто использует изменяемый код (blast radius): контексты и `buildRegex` используются многими компонентами.

## Скиллы проекта

Расположение: `.claude/skills/`. `daisyui`, `tailwind-4-docs`, `web-design-guidelines` ставит и обновляет `bunx skills` (`bunx skills update -p`), версии зафиксированы в `skills-lock.json`; руками их не правим. `map-regex` и `solid-patterns` — локальные, правятся как обычные файлы проекта. Поле `name` во frontmatter должно совпадать с именем папки.

| Скилл | Когда использовать |
|---|---|
| `map-regex` | Regex модов карт, `data/maps.sqlite`, `buildRegex` и `regex-builders`, новые фильтры, скрипты `regex:fetch`/`regex:check`/`regex:simulate`, обновление данных после патча PoE. |
| `solid-patterns` | Любой `.tsx`/`.ts` в `src/`: компоненты, props, сигналы и сторы, контексты, профили в `localStorage`, баги «UI не обновляется», изменение формы `MapsStore`. |
| `daisyui` | Любая разметка: выбор компонента daisyUI, классы, цвета и темы (`winter`/`dim` в `src/app.css`). |
| `tailwind-4-docs` | Утилиты, варианты и директивы Tailwind 4 (`@import`, `@plugin`, `@theme` в `src/app.css`). Перед первым использованием нужна инициализация снапшота документации — см. сам скилл; путь к скрипту — `.claude/skills/tailwind-4-docs/scripts/`. |
| `web-design-guidelines` | Ревью UI: доступность, формы, адаптивность — по запросу «проверь интерфейс». |

Типичные комбинации:
- Новый фильтр на странице карт → `map-regex` + `solid-patterns` + `daisyui`.
- Новый компонент или вёрстка → `solid-patterns` + `daisyui` (+ `tailwind-4-docs`, если нужны нестандартные утилиты).

## Стек

- **SolidJS 1.9** + **SolidStart 1.x** (Vinxi, Vite), роутер `@solidjs/router`, файловые маршруты в `src/routes/`. Не React: компоненты выполняются один раз, реактивность — через сигналы, сторы и мемо.
- Сайт **полностью статический**: в `app.config.ts` `ssr: false` и `prerender.crawlLinks`. Сервера, API-роутов, `"use server"`, БД в рантайме и env-переменных нет — не добавляй их без явной задачи. Страницы с `localStorage` подключаются через `clientOnly(...)` (см. `src/routes/maps.tsx`).
- Стили: **Tailwind CSS 4** (`@tailwindcss/vite`, конфиг в `src/app.css`, без `tailwind.config`) + **daisyUI 5** (темы `winter`/`dim`). Используй классы daisyUI (`btn`, `input`, `link`…) и токены темы (`text-primary`, `bg-base-300`), а не захардкоженные цвета.
- Проект **ESM** (`"type": "module"`), TypeScript `strict`, `moduleResolution: bundler`. Алиасы: `~/*` → `src/*`, `@/*` → корень. Внутри `src` импортируй через `~/`, соседние файлы — относительно (`./Tab`).
- Пакетный менеджер: **bun** (`bun install`, `bun add`, `bunx` вместо `npm`/`npx`). Node `>= 22.13` нужен для `node:sqlite`.
- Деплой — **Vercel** (`vercel.json`, `bun install --frozen-lockfile`). GitHub Pages и Prisma/Supabase удалены — не возвращай их.
- Тестов, линтера и форматтера нет. Проверка — `bun run build` (сборка + пререндер должны проходить) и скрипты regex ниже. Форматирование держи как в окружающем коде: двойные кавычки, точки с запятой, отступ 2 пробела.

## Данные модов карт

- Источник правды — `data/maps.sqlite`, таблица `maps (id, name, rank, regex)`. Плагин `mapModsPlugin` в `app.config.ts` читает её при сборке и отдаёт как виртуальный модуль `virtual:map-mods` (тип объявлен в `src/global.d.ts`), а `src/api/index.ts` экспортирует `mapMods: MapMod[]`. Во время работы сайта к SQLite никто не обращается.
- Эталон текстов игры — `scripts/map-regex/data/poedb-map-mods.json` (русские строки модов с poedb.tw, все тиры, включая T17).
- Скрипты:
  - `bun run regex:fetch` — заново скачать эталон с poedb.
  - `bun run regex:check` — проверить regex всех модов по эталону (exit 1 при ошибках); `--apply` пишет исправления в `data/maps.sqlite`.
  - `bun run regex:simulate` — сквозная проверка: собирает карты из реальных строк, строит строку поиска настоящим `buildRegex` и считает подсветку так, как игра.
- После правки regex модов или `buildRegex` / `regex-builders` — обязательно прогоняй `regex:check` и `regex:simulate`.
- Строка поиска PoE: термы в кавычках через пробел — AND, `|` внутри терма — OR, `!` в начале — отрицание; длина строки в игре ограничена, поэтому regex модов делаем как можно короче, но однозначными для русского клиента.

## Архитектура

- `src/routes/` — только тонкие страницы-обёртки: провайдеры контекста + компоненты из `src/pages/<страница>/`.
- `src/pages/<страница>/` — всё, что относится к одной странице: компоненты, контексты, сборка regex. Публичное — через `index.ts` (barrel).
- `src/components/` — общие компоненты (шапка, layout), `src/lib/` — общие типы и чистые хелперы.
- Состояние страницы — в Solid-контексте с провайдером: `createContext` в `context.ts`, провайдер в `Provider.tsx`/`Context.tsx`, доступ через `useContext(...)`. Профили карт хранятся в `localStorage` через `makePersisted` из `@solid-primitives/storage` (ключ `STORAGE_KEY`); при изменении формы `MapsStore` учитывай уже сохранённые у пользователей данные и дополняй `initialMapsContextState()`.
- Состояние стора меняй через сеттеры Solid (`setProfiles(path, value)`, `reconcile`, `batch`), не мутируй объекты стора напрямую; для копий используй `unwrap`.

## Стиль кода

- **Комментарии не пишем — любые**, включая JSDoc и пояснения в строку. Если коду нужен комментарий, значит его надо переписать: понятные имена, вынесенные в именованные функции шаги, явные типы. Именованная константа вместо комментария допустима, только если её имя объясняет неочевидное значение. Существующие комментарии не трогаем без задачи (см. «Surgical Changes»).
- **Тексты для пользователя — на русском**: подписи, плейсхолдеры, `alert`, сообщения об ошибках в UI. Сайт целиком под русский клиент PoE.
- **Ошибки не бросаются молча.** Перед `throw new Error(...)` выводи ошибку через `console.error(...)` с контекстом (какой модуль, что сломано, что сделать) по-русски.
- **Компоненты — `export function Name(props)`**, по одному на файл, имя файла = имя компонента (`RegexArea.tsx`). Типы пропсов — `type Props = {...}` или инлайн `ParentProps<{...}>`.
- **Не деструктурируй `props`** в сигнатуре и теле компонента: в Solid это ломает реактивность. Пиши `props.value`, а для разбиения — `splitProps`/`mergeProps`. Значения, которые должны обновляться, передавай как `Accessor` (`value: Accessor<number | undefined>`) или читай через `props.x`. В старом коде деструктуризация встречается — новую не добавляй.
- **Реактивные примитивы Solid вместо ручной логики**: производные значения — `createMemo`, условия и списки в JSX — `<Show>`/`<For>`/`<Switch>`, а не `&&`/`.map`. `createEffect` — только для побочных эффектов (DOM, storage, clipboard), не для синхронизации одного состояния с другим.
- **JSX-атрибуты Solid**: `class`/`classList`, а не `className`; `onInput` для полей ввода; `ref` через `let el!: HTMLElement`.
- **Без лишних констант.** Не выноси значение в `const`, если оно используется один раз и не экспортируется — пиши его инлайн. Константа оправдана, только если она экспортируется или используется в нескольких местах.
- **Порядок в файле: главное сверху, вспомогательное снизу.** Сначала импорты, затем экспортируемый код (компонент, функция), а вспомогательные функции и локальные типы — в конце файла. Вспомогательные функции объявляй через `function` (они хойстятся), стрелочные — только для инлайн-колбэков и обработчиков внутри компонента. Пример — `src/pages/maps/regex-area/context/buildRegex.ts`.
- **Сборка regex — чистые функции.** Всё, что превращает `MapsStore` в строку поиска (`buildRegex`, `regex-builders/*`), не зависит от Solid, DOM и `localStorage`: так её переиспользует `scripts/map-regex/simulate.ts`.
- **Импорты типов — `import type` / `type X`** в именованном импорте (`import { type Accessor, createMemo } from "solid-js"`).
- **Короткие файлы.** В идеале до 50 строк на файл. Если файл растёт — дроби его на соседние файлы рядом (в той же папке или во вложенной): отдельно типы, хелперы, подкомпоненты.

# Поведенческие правила

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
