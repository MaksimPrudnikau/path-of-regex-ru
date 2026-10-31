import { useContext } from "solid-js";
import { RegexBlock } from "~/components/regex";
import { MapsProfileContext } from "~/pages/maps/context";
import { initialMapsContextState } from "~/pages/maps/context/maps";
import { RegexAreaContext } from "~/pages/maps/regex-area/context";

export function RegexAreaPanel() {
  const { updateProfile } = useContext(MapsProfileContext);
  const { errorMessage, regex } = useContext(RegexAreaContext);

  return (
    <RegexBlock
      emptyHint="Выберите моды и параметры ниже, и здесь появится строка для поиска карт"
      errorMessage={errorMessage}
      onReset={() => {
        updateProfile(() => initialMapsContextState());
        resetSearchModInputs();
      }}
      regex={regex}
    />
  );
}

function resetSearchModInputs() {
  document.querySelectorAll<HTMLInputElement>("#search-mod-input").forEach((input) => {
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
  });
}
