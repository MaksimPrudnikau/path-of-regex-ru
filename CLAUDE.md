# CLAUDE.md

## Обязательный порядок работы

Перед **любым** действием (ответ на вопрос о коде, правка, рефакторинг, добавление фичи, отладка) выполняй два шага:

1. **Проверь скиллы.** Сверь задачу с таблицей ниже. Если подходит хотя бы один скилл, вызови его через `Skill` **до** чтения/написания кода и следуй его инструкциям. Если подходят несколько, загрузи все подходящие. Если не подходит ни один, явно отметь это для себя и продолжай.
2. **Ищи код через граф, если он есть.** Если в корне появился `.codegraph/`, сначала используй `codegraph_explore` (или `codegraph explore "<символы или вопрос>"` в shell), и только потом `Grep`/`Read`. Без индекса используй обычные `Grep`/`Read`. Перед правкой посмотри, кто использует изменяемый код (blast radius): контексты и `buildRegex` используются многими компонентами.

## Скиллы проекта

Расположение: `.claude/skills/`. `daisyui`, `tailwind-4-docs`, `web-design-guidelines` ставит и обновляет `bunx skills` (`bunx skills update -p`), версии зафиксированы в `skills-lock.json`; руками их не правим. `map-regex` и `solid-patterns` локальные и правятся как обычные файлы проекта. Поле `name` во frontmatter должно совпадать с именем папки.

| Скилл | Когда использовать |
|---|---|
| `map-regex` | Regex модов карт, `data/maps.sqlite`, `buildRegex` и `regex-builders`, новые фильтры, скрипты `regex:fetch`/`regex:check`/`regex:simulate`, обновление данных после патча PoE. |
| `solid-patterns` | Любой `.tsx`/`.ts` в `src/`: компоненты, props, сигналы и сторы, контексты, профили в `localStorage`, баги «UI не обновляется», изменение формы `MapsStore`. |
| `daisyui` | Любая разметка: выбор компонента daisyUI, классы, цвета и темы (`winter`/`dim` в `src/app.css`). |
| `tailwind-4-docs` | Утилиты, варианты и директивы Tailwind 4 (`@import`, `@plugin`, `@theme` в `src/app.css`). Перед первым использованием нужна инициализация снапшота документации (см. сам скилл), скрипт лежит в `.claude/skills/tailwind-4-docs/scripts/`. |
| `web-design-guidelines` | Ревью UI по запросу «проверь интерфейс»: доступность, формы, адаптивность. |

Типичные комбинации:
- Новый фильтр на странице карт → `map-regex` + `solid-patterns` + `daisyui`.
- Новый компонент или вёрстка → `solid-patterns` + `daisyui` (+ `tailwind-4-docs`, если нужны нестандартные утилиты).

## Стек

- **SolidJS 1.9** + **SolidStart 1.x** (Vinxi, Vite), роутер `@solidjs/router`, файловые маршруты в `src/routes/`. Не React: компоненты выполняются один раз, реактивность строится на сигналах, сторах и мемо.
- **Рендеринг выбирается постранично** (хостинг Vercel, Nitro сам переключается на пресет `vercel`). SSR включён, `prerender.crawlLinks` собирает страницы заранее (SSG). Страница без серверных данных, как карты, остаётся SSG. Страница с серверными данными исключается из prerender (`prerender.ignore`) и получает правило в `routeRules`, например `isr` с временем жизни кэша, как `/bestiary`. Серверные данные загружаются через `query` с `"use server"` и `createAsync` в маршруте. Если внешний источник недоступен, страница должна работать на сохранённом снимке. БД в рантайме и env-переменных нет, не добавляй их без явной задачи.
- Чтение `localStorage` на странице устроено одним из двух способов:
  - **SSG-страница без серверных данных** целиком подключается через `clientOnly(...)` (см. `src/routes/maps.tsx`).
  - **SSR-страница** рендерится на сервере полностью, с настройками по умолчанию, а сохранённое состояние подставляется в `onMount` уже в браузере (см. `src/pages/bestiary/context/savedState.ts`). Так кэш ISR отдаёт готовую страницу без мигания, и гидратация не ломается. Всё, что зависит от окружения (часовой пояс, `localStorage`, `navigator`), не должно влиять на первый рендер: например, дату форматируй с явным `timeZone`.
- Серверные данные загружаются в маршруте и передаются в страницу пропсами (см. `src/routes/bestiary.tsx`).
- Стили: **Tailwind CSS 4** (`@tailwindcss/vite`, конфиг в `src/app.css`, без `tailwind.config`) + **daisyUI 5** (темы `winter`/`dim`). Используй классы daisyUI (`btn`, `input`, `link`…) и токены темы (`text-primary`, `bg-base-300`), а не захардкоженные цвета.
- Проект **ESM** (`"type": "module"`), TypeScript `strict`, `moduleResolution: bundler`. Алиасы: `~/*` → `src/*`, `@/*` → корень. Внутри `src` импортируй через `~/`, а соседние файлы относительным путём (`./Tab`).
- Пакетный менеджер: **bun** (`bun install`, `bun add`, `bunx` вместо `npm`/`npx`). Node `>= 22.13` нужен для `node:sqlite`.
- Деплой идёт на **Vercel** (`vercel.json`, `bun install --frozen-lockfile`). GitHub Pages и Prisma/Supabase удалены, не возвращай их.
- Тестов, линтера и форматтера нет. Для проверки запускай `bun run build` (сборка и пререндер должны проходить) и скрипты regex ниже. Форматирование держи как в окружающем коде: двойные кавычки, точки с запятой, отступ 2 пробела.

## Данные модов карт

- Источник правды: `data/maps.sqlite`, таблица `maps (id, name, rank, regex)`. Плагин `mapModsPlugin` в `app.config.ts` читает её при сборке и отдаёт как виртуальный модуль `virtual:map-mods` (тип объявлен в `src/global.d.ts`), а `src/api/index.ts` экспортирует `mapMods: MapMod[]`. Во время работы сайта к SQLite никто не обращается.
- Эталон текстов игры: `scripts/map-regex/data/poedb-map-mods.json` (русские строки модов с poedb.tw, все тиры, включая T17).
- Скрипты:
  - `bun run regex:fetch` заново скачивает эталон с poedb.
  - `bun run regex:check` проверяет regex всех модов по эталону (exit 1 при ошибках); `--apply` пишет исправления в `data/maps.sqlite`.
  - `bun run regex:simulate` делает сквозную проверку: собирает карты из реальных строк, строит строку поиска настоящим `buildRegex` и считает подсветку так, как игра.
- После правки regex модов или `buildRegex` / `regex-builders` обязательно прогоняй `regex:check` и `regex:simulate`.
- Строка поиска PoE: термы в кавычках через пробел работают как AND, `|` внутри терма как OR, `!` в начале терма означает отрицание; длина строки в игре ограничена, поэтому regex модов делаем как можно короче, но однозначными для русского клиента.

## Данные бестиария

- Источник данных: `data/bestiary.json`. В нём звери (русское имя, regex, цвет `red`/`yellow`, группа и семейство) и рецепты с нужными зверями. Красные звери берутся из рецептов poedb (общая страница рецептов и страницы самих зверей, где бывают рецепты, которых нет на общей). Жёлтые звери берутся из списка poe.ninja по всем лигам, их русские имена, группы и семейства берутся со страниц poedb. Страница `/bestiary` импортирует JSON напрямую (`src/pages/bestiary/data.ts`).
- Цены грузятся с poe.ninja на сервере при открытии `/bestiary` (`getBeastPrices`, `query` с `"use server"`, запросы в `src/pages/bestiary/price/ninja.ts`). Браузер не может ходить в poe.ninja сам: там нет CORS. На Vercel страница отдаётся через ISR и кэшируется на 30 минут, сервер дополнительно держит цены в памяти столько же. Если poe.ninja не ответил, берётся снимок `data/bestiary-prices.json`, и страница пишет, что цены из снимка.
- Эталон имён: `scripts/bestiary/data/poedb-names.json` (имена монстров и свойства бестиария с poedb.tw). Regex зверя не должен совпадать ни с одним из них. Подбор regex и проверки лежат в `scripts/bestiary/lib.mjs`, парсинг poedb в `poedb.mjs`. Запросы к poe.ninja общие для сайта и скриптов, поэтому `bestiary:fetch` и `bestiary:prices` запускаются через `tsx`.
- Regex зверя это кратчайшая подстрока имени (от 4 символов, у каждого слова на стыке от 3), которой нет в эталоне. Если имя целиком входит в имя другого монстра, берётся префикс с `^`, а если и он не уникален, всё имя как `^имя$`. Регистр букв сохраняется как в игре.
- Строка поиска длиннее 250 символов делится на порции (`buildBestiaryBatches`), звери идут по убыванию цены, поэтому в первой порции самые дорогие. В режиме исключения строку разбить нельзя.
- Скрипты:
  - `bun run bestiary:fetch` заново скачивает рецепты, зверей и эталон с poedb.tw и poe.ninja и пересчитывает все regex (около полутора минут).
  - `bun run bestiary:prices` обновляет запасной снимок `data/bestiary-prices.json` и пишет, каких зверей с poe.ninja нет в данных (тогда нужен `bestiary:fetch`).
  - `bun run bestiary:check` сверяет regex каждого зверя с эталоном (exit 1 при ошибках) и подсказывает более короткие варианты; `--apply` записывает исправления в `data/bestiary.json`.
  - `bun run bestiary:simulate` делает сквозную проверку: собирает зверинец из имён эталона и свойств, строит строку настоящим `buildBestiaryRegex` и `buildBestiaryBatches` для одиночных зверей, рецептов и случайных наборов и считает подсветку так, как игра, с регистром и без, в режимах поиска и исключения.
- После патча PoE или правки `buildBestiaryRegex` прогоняй `bestiary:check` и `bestiary:simulate`. Ожидаемый результат: `с ошибками 0` и `ошибок: 0`.
- Как выглядит текст зверинца в игре, poedb не знает (например, случайные имена жёлтых зверей). Если в игре подсветилось лишнее, добавь этот текст в эталон и снова прогони проверки.

## Версии сайта

- Список версий лежит в `src/pages/changelog/releases.tsx`, новая версия добавляется в начало массива `releases` с датой выпуска в формате `YYYY-MM-DD`. Версия в шапке берётся из первой записи, страница `/changelog` показывает весь список.
- Каждое заметное для пользователя изменение получает новую версию:
  - **Major** меняет вторую цифру и сбрасывает третью (`1.1.0` → `1.2.0`): новая страница или крупная функция на весь сайт.
  - **Minor** меняет третью цифру (`1.1.0` → `1.1.1`): изменение в пределах одной страницы, например новый фильтр или исправление regex.
- Пиши только самое главное, не перечисляй каждую правку. Рефакторинг, сборку, хостинг, скрипты и мелкие исправления вёрстки в список не добавляй.
- Текст должен выглядеть презентабельно: короткие пункты на русском, первым пунктом главное изменение версии (например, «Добавлена страница бестиария»), дальше подробности. Пункт без оформления пишется строкой, а пункт с разметкой функцией `() => <>…</>`, чтобы разметка создавалась при рендере, а не при импорте модуля. В разметке можно использовать `<b>`, `<u>`, `<i>`, классы daisyUI и Tailwind (`text-primary`, `badge`, `link`), ссылки `<A href="/bestiary">` на страницы сайта.

## Архитектура

- `src/routes/`: только тонкие страницы-обёртки с провайдерами контекста и компонентами из `src/pages/<страница>/`.
- `src/pages/<страница>/`: всё, что относится к одной странице (компоненты, контексты, сборка regex). Публичное экспортируется через `index.ts` (barrel).
- `src/components/`: общие компоненты (шапка, layout). `src/lib/`: общие типы и чистые хелперы.
- Состояние страницы живёт в Solid-контексте с провайдером: `createContext` в `context.ts`, провайдер в `Provider.tsx`/`Context.tsx`, доступ через `useContext(...)`. Профили карт хранятся в `localStorage` через `makePersisted` из `@solid-primitives/storage` (ключ `STORAGE_KEY`); при изменении формы `MapsStore` учитывай уже сохранённые у пользователей данные и дополняй `initialMapsContextState()`.
- Состояние стора меняй через сеттеры Solid (`setProfiles(path, value)`, `reconcile`, `batch`), не мутируй объекты стора напрямую; для копий используй `unwrap`.

## Стиль кода

- **Комментарии не пишем совсем**, включая JSDoc и пояснения в строку. Если коду нужен комментарий, значит его надо переписать: понятные имена, вынесенные в именованные функции шаги, явные типы. Именованная константа вместо комментария допустима, только если её имя объясняет неочевидное значение. Существующие комментарии не трогаем без задачи (см. «Surgical Changes»).
- **Тексты для пользователя пишем на русском**: подписи, плейсхолдеры, `alert`, сообщения об ошибках в UI. Сайт целиком под русский клиент PoE.
- **Без тире.** Не используй тире как знак препинания: ни короткое `–`, ни длинное `—`, ни дефис с пробелами ` - `. Правило действует для текстов в UI, сообщений об ошибках, документации, коммитов и ответов в чате. Строй предложения так, чтобы тире не понадобилось: двоеточие, запятая, точка или отдельное предложение. Дефис внутри слова (`кто-то`, `лев-альфа`) тире не считается.
- **Ошибки не бросаются молча.** Перед `throw new Error(...)` выводи ошибку через `console.error(...)` с контекстом (какой модуль, что сломано, что сделать) по-русски.
- **Компоненты объявляем как `export function Name(props)`**, по одному на файл, имя файла = имя компонента (`RegexArea.tsx`). Типы пропсов: `type Props = {...}` или инлайн `ParentProps<{...}>`.
- **Не деструктурируй `props`** в сигнатуре и теле компонента: в Solid это ломает реактивность. Пиши `props.value`, а для разбиения используй `splitProps`/`mergeProps`. Значения, которые должны обновляться, передавай как `Accessor` (`value: Accessor<number | undefined>`) или читай через `props.x`. В старом коде деструктуризация встречается, новую не добавляй.
- **Реактивные примитивы Solid вместо ручной логики**: производные значения считай через `createMemo`, условия и списки в JSX пиши через `<Show>`/`<For>`/`<Switch>`, а не `&&`/`.map`. `createEffect` нужен только для побочных эффектов (DOM, storage, clipboard), не для синхронизации одного состояния с другим.
- **JSX-атрибуты Solid**: `class`/`classList`, а не `className`; `onInput` для полей ввода; `ref` через `let el!: HTMLElement`.
- **Без лишних констант.** Не выноси значение в `const`, если оно используется один раз и не экспортируется: пиши его инлайн. Константа оправдана, только если она экспортируется или используется в нескольких местах.
- **Порядок в файле: главное сверху, вспомогательное снизу.** Сначала импорты, затем экспортируемый код (компонент, функция), а вспомогательные функции и локальные типы в конце файла. Вспомогательные функции объявляй через `function` (они хойстятся), стрелочные только для инлайн-колбэков и обработчиков внутри компонента. Пример: `src/pages/maps/regex-area/context/buildRegex.ts`.
- **Сборка regex состоит из чистых функций.** Всё, что превращает `MapsStore` в строку поиска (`buildRegex`, `regex-builders/*`), не зависит от Solid, DOM и `localStorage`: так её переиспользует `scripts/map-regex/simulate.ts`.
- **Импорты типов пишем через `import type` / `type X`** в именованном импорте (`import { type Accessor, createMemo } from "solid-js"`).
- **Короткие файлы.** В идеале до 50 строк на файл. Если файл растёт, дроби его на соседние файлы рядом (в той же папке или во вложенной): отдельно типы, хелперы, подкомпоненты.

# Поведенческие правила

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them; don't pick silently.
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
- If you notice unrelated dead code, mention it, but don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
