import { useContext } from "solid-js";
import { RegexAreaContext } from "~/pages/maps/regex-area/Context";

export function CopyButton() {
  const context = useContext(RegexAreaContext);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(context.regex());
    context.updateStore("copied", true);
  };

  return (
    <button
      class={"btn btn-primary"}
      disabled={!!context.errorMessage()}
      onClick={copyToClipboard}
      type={"button"}
    >
      Скопировать
    </button>
  );
}
