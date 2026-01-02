import { useContext } from "solid-js";
import { initialMapsContextState, MapsContext, } from "~/pages/maps/context/context";

export function RegexAreaButtons() {
  const { updateStore } = useContext(MapsContext);
  const resetRegex = () => {
    updateStore(initialMapsContextState());
  };

  return (
    <div class={"row gap-3"}>
      <button class={"btn btn-primary"} type={"button"}>
        Скопировать
      </button>
      <button class={"btn btn-secondary"} onClick={resetRegex} type={"button"}>
        Сбросить
      </button>
    </div>
  );
}
