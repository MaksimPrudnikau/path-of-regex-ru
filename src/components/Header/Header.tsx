import { Tab } from "./Tab";

export function Header() {
  return (
    <header class={"w-full col gap-5 items-start"}>
      <h1>Path of Regex Ru (Русская версия)</h1>
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
        <Tab disabled icon={"flasks"}>
          Флаконы
        </Tab>
        <Tab disabled icon={"bestiary"}>
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
