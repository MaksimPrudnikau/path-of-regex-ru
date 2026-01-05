import { useContext } from "solid-js";
import { initialMapsContextState, MapsContext } from "~/pages/maps/context/maps";
import { RegexAreaContext } from "~/pages/maps/regex-area/context";

export function ResetButton() {
  const { updateStore: updateMapsStore } = useContext(MapsContext);
  const { updateStore: updateRegexAreaStore } = useContext(RegexAreaContext);

  const resetRegex = () => {
    updateMapsStore(initialMapsContextState());

    updateRegexAreaStore("copied", false);

    resetSearchModInputs();
  };

  return (
    <button class={"btn btn-secondary"} onClick={resetRegex} type={"button"}>
      Сбросить
    </button>
  );
}

function resetSearchModInputs() {
  document
    .querySelectorAll<HTMLInputElement>("#search-mod-input")
    .forEach((input: HTMLInputElement) => {
      input.value = "";
      const changeEvent = new Event("input", { bubbles: true, cancelable: true });
      input.dispatchEvent(changeEvent);
    });
}
