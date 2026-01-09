import { useContext } from "solid-js";
import { MapsProfileContext } from "~/pages/maps/context";
import { initialMapsContextState } from "~/pages/maps/context/maps";
import { RegexAreaContext } from "~/pages/maps/regex-area/context";

export function ResetButton() {
  const { updateProfile } = useContext(MapsProfileContext);
  const { updateStore: updateRegexAreaStore } = useContext(RegexAreaContext);

  const resetRegex = () => {
    updateProfile(() => initialMapsContextState());

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
