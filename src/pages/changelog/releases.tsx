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
    version: "1.2.1",
    date: "2026-10-29",
    changes: [
      () => (
        <>
          На странице{" "}
          <PageLink href="/flasks" icon="flasks">
            флаконов
          </PageLink>{" "}
          можно <b>вставить готовую строку поиска</b>, и карточки подберутся сами
        </>
      ),
      () => (
        <>
          В{" "}
          <PageLink href="/bestiary" icon="bestiary">
            бестиарии
          </PageLink>{" "}
          цены можно показывать в <GameEntity icon="chaos" tone="text-secondary">хаосах</GameEntity> или{" "}
          <GameEntity icon="divine" tone="text-warning">диванах</GameEntity>
        </>
      ),
      () => (
        <>
          Кнопка копирования и вид скопированной строки теперь одинаковы на страницах{" "}
          <PageLink href="/maps" icon="maps">
            карт
          </PageLink>
          ,{" "}
          <PageLink href="/bestiary" icon="bestiary">
            бестиария
          </PageLink>{" "}
          и{" "}
          <PageLink href="/flasks" icon="flasks">
            флаконов
          </PageLink>
        </>
      ),
    ],
  },
  {
    version: "1.2.0",
    date: "2026-10-28",
    changes: [
      () => (
        <>
          Добавлена страница{" "}
          <PageLink href="/flasks" icon="flasks">
            флаконов
          </PageLink>
        </>
      ),
      () => (
        <>
          Строка поиска по <b>базам</b> и <b>свойствам</b> флаконов{" "}
          <GameEntity icon="flasks/Eternal_Life_Flask.webp" tone="text-error">
            жизни
          </GameEntity>
          ,{" "}
          <GameEntity icon="flasks/Eternal_Mana_Flask.webp" tone="text-info">
            маны
          </GameEntity>{" "}
          и{" "}
          <GameEntity icon="flasks/Quicksilver_Flask.webp" tone="text-accent">
            особых
          </GameEntity>{" "}
          флаконов для торговцев и тайника
        </>
      ),
      () => (
        <>
          Для каждого свойства можно задать <b>минимальный тир</b>, а переключатель решает, нужны ли и префикс, и суффикс сразу
        </>
      ),
      () => (
        <>
          Профили, как на страницах{" "}
          <PageLink href="/maps" icon="maps">
            карт
          </PageLink>{" "}
          и{" "}
          <PageLink href="/bestiary" icon="bestiary">
            бестиария
          </PageLink>
        </>
      ),
    ],
  },
  {
    version: "1.1.1",
    date: "2026-10-22",
    changes: [
      () => (
        <>
          Импорт regex на странице <GameEntity icon="maps" tone="text-error">карт</GameEntity>: готовую строку можно вставить в поле поиска модов, выбранные моды подсветятся в списке, их можно поправить и забрать обновлённую строку
        </>
      ),
    ],
  },
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
          Строка поиска для <GameEntity icon="bestiary" tone="text-info">зверинца</GameEntity>: <GameEntity icon="bestiary" tone="text-error">красные</GameEntity> и{" "}
          <GameEntity icon="bestiary" tone="text-warning">жёлтые</GameEntity> звери из <b>рецептов</b> или выбранные вручную, поиск по имени и рецепту
        </>
      ),
      () => (
        <>
          Цены <b>poe.ninja</b> по лигам в <GameEntity icon="chaos" tone="text-secondary">хаосах</GameEntity> и подбор <GameEntity icon="bestiary" tone="text-info">зверей</GameEntity> ползунком по диапазону цен
        </>
      ),
      () => (
        <>
          Режим <u>исключения</u>: подсветить всех <GameEntity icon="bestiary" tone="text-info">зверей</GameEntity>, кроме ценных, чтобы не отдать их в жертву
        </>
      ),
      () => (
        <>
          Под ползунком цен появились <b>отметки цен</b>, чтобы сразу видеть, где на шкале <GameEntity icon="chaos" tone="text-secondary">1, 10 или 100 хаосов</GameEntity>
        </>
      ),
      () => (
        <>
          <b>Профили</b>: выбор <GameEntity icon="bestiary" tone="text-info">зверей</GameEntity>, фильтры и лига сохраняются отдельно, как на странице{" "}
          <PageLink href="/maps" icon="maps">
            карт
          </PageLink>
        </>
      ),
      () => (
        <>
          Длинная строка поиска делится на части, в первой самые дорогие <GameEntity icon="bestiary" tone="text-info">звери</GameEntity>
        </>
      ),
      "Версия сайта в шапке и страница «Что нового»",
    ],
  },
  {
    version: "1.0.2",
    date: "2026-10-02",
    changes: [
      () => (
        <>
          Regex всех модов <GameEntity icon="maps" tone="text-error">карт</GameEntity> сверены с текстами русского клиента, включая карты <GameEntity icon="maps" tone="text-error">T17</GameEntity>
        </>
      ),
      () => (
        <>
          Исправлены фильтры по редкости <GameEntity icon="maps" tone="text-error">карт</GameEntity>, неопознанным и осквернённым картам
        </>
      ),
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
          Строка поиска по модам <GameEntity icon="maps" tone="text-error">карт</GameEntity>: <b>включить</b> нужные и <u>исключить</u> опасные моды
        </>
      ),
      () => (
        <>
          Фильтры по количеству и редкости предметов, размеру групп монстров, качеству,{" "}
          <GameEntity icon="chaos" tone="text-secondary">
            валюте
          </GameEntity>
          ,{" "}
          <GameEntity icon="maps" tone="text-error">
            картам
          </GameEntity>{" "}
          и{" "}
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
