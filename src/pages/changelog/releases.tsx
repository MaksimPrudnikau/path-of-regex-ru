import type { JSX } from "solid-js";
import { GameEntity } from "./GameEntity";
import { PageLink } from "./PageLink";

export type Change = string | (() => JSX.Element);

export type Release = {
  version: string;
  date: string;
  changes: Change[];
};

export const releases: Release[] = [
  {
    version: "1.1.0",
    date: "2026-10-22",
    changes: [
      () => (
        <>
          Добавлена страница{" "}
          <PageLink href="/bestiary" icon="bestiary">
            бестиария
          </PageLink>
        </>
      ),
      () => (
        <>
          Строка поиска для зверинца: <GameEntity icon="bestiary" tone="text-error">красные</GameEntity> и{" "}
          <GameEntity icon="bestiary" tone="text-warning">жёлтые</GameEntity> звери из <b>рецептов</b> или выбранные вручную, поиск по имени и рецепту
        </>
      ),
      () => (
        <>
          Цены <b>poe.ninja</b> по лигам в <GameEntity icon="chaos" tone="text-secondary">хаосах</GameEntity> и подбор зверей ползунком по диапазону цен
        </>
      ),
      () => (
        <>
          Режим <u>исключения</u>: подсветить всех зверей, кроме ценных, чтобы не отдать их в жертву
        </>
      ),
      () => (
        <>
          Под ползунком цен появились <b>отметки цен</b>, чтобы сразу видеть, где на шкале <GameEntity icon="chaos" tone="text-secondary">1, 10 или 100 хаосов</GameEntity>
        </>
      ),
      () => (
        <>
          <b>Профили</b>: выбор зверей, фильтры и лига сохраняются отдельно, как на странице карт
        </>
      ),
      "Длинная строка поиска делится на части, в первой самые дорогие звери",
      "Версия сайта в шапке и страница «Что нового»",
    ],
  },
  {
    version: "1.0.2",
    date: "2026-10-02",
    changes: [
      () => (
        <>
          Regex всех модов карт сверены с текстами русского клиента, включая карты <GameEntity icon="maps" tone="text-error">T17</GameEntity>
        </>
      ),
      "Исправлены фильтры по редкости карт, неопознанным и осквернённым картам",
    ],
  },
  {
    version: "1.0.1",
    date: "2026-07-26",
    changes: [
      () => (
        <>
          Обновление под патч <b>3.29</b>: исправлен фильтр по уровню карты
        </>
      ),
    ],
  },
  {
    version: "1.0.0",
    date: "2026-01-10",
    changes: [
      () => (
        <>
          Добавлена страница{" "}
          <PageLink href="/maps" icon="maps">
            карт
          </PageLink>
        </>
      ),
      () => (
        <>
          Строка поиска по модам карт: <b>включить</b> нужные и <u>исключить</u> опасные моды
        </>
      ),
      () => (
        <>
          Фильтры по количеству и редкости предметов, размеру групп монстров, качеству, валюте, картам и{" "}
          <GameEntity icon="scarabs" tone="text-accent">
            скарабеям
          </GameEntity>
        </>
      ),
      "Профили с сохранёнными настройками фильтров",
    ],
  },
];

export const currentVersion = releases[0].version;
