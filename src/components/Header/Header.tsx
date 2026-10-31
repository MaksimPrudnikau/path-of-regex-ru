import { A } from '@solidjs/router'
import { currentVersion } from '~/pages/changelog'
import { Tab } from './Tab'

export function Header() {
  return (
    <header class={"w-full col gap-10 items-start mt-2"}>
      <h1 class={"flex flex-wrap items-baseline gap-3"}>
        <A class={"link link-hover"} href={"/"}>
          Path of Regex Ru (Русская версия){" "}
          <span class={"text-sm font-light text-gray-400 items-start"}>3.29</span>
        </A>
        <A class={"link link-hover text-sm text-primary"} href={"/changelog"} title={"Что нового"}>
          v{currentVersion}
        </A>
      </h1>
      <div class={`flex gap-3 flex-wrap`}>
        <Tab disabled icon={"vendors"}>
          Торговцы
        </Tab>
        <Tab icon={"maps"}>Карты</Tab>
        <Tab disabled icon={"items"}>
          Предметы
        </Tab>
        <Tab disabled icon={"map-names"}>
          Названия карт
        </Tab>
        <Tab disabled icon={"expedition"}>
          Экспедиция
        </Tab>
        <Tab disabled icon={"heists"}>
          Кража
        </Tab>
        <Tab icon={"flasks"}>
          Флаконы
        </Tab>
        <Tab icon={"bestiary"}>
          Бестиарий
        </Tab>
        <Tab disabled icon={"scarabs"}>
          Скарабеи
        </Tab>
        <Tab disabled icon={"jewels"}>
          Камни
        </Tab>
      </div>
    </header>
  );
}
