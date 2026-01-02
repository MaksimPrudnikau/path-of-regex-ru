import { useContext } from "solid-js";
import { initialMapsContextState, MapsContext, } from "~/pages/maps/context/context";
import { RegexAreaContext } from "~/pages/maps/regex-area/Context";

export function ResetButton() {
  const { updateStore: updateMapsStore } = useContext(MapsContext);
  const { updateStore: updateRegexAreaStore } = useContext(RegexAreaContext);

  const resetRegex = () => {
    updateMapsStore(initialMapsContextState());
    updateRegexAreaStore("copied", false);
  };

  return (
    <button class={"btn btn-secondary"} onClick={resetRegex} type={"button"}>
      Сбросить
    </button>
  );
}
