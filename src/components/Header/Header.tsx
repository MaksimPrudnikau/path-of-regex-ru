import { Tab } from "./Tab";

export function Header() {
  return (
    <header class={"w-full col gap-5 items-start"}>
      <h1>Path of Regex Ru (Русская версия)</h1>
      <div class={`flex gap-3 flex-wrap`}>
        <Tab icon={"vendors"}>Торговцы</Tab>
        <Tab icon={"maps"}>Карты</Tab>
        <Tab icon={"items"}>Предметы</Tab>
        <Tab icon={"map-names"}>Названия карт</Tab>
        <Tab icon={"expedition"}>Экспедиция</Tab>
        <Tab icon={"heists"}>Кража</Tab>
        <Tab icon={"flasks"}>Флаконы</Tab>
        <Tab icon={"bestiary"}>Бестиарий</Tab>
        <Tab icon={"scarabs"}>Скарабеи</Tab>
        <Tab icon={"jewels"}>Камни</Tab>
      </div>
    </header>
  );
}
