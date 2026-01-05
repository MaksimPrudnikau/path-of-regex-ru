import { createSignal } from "solid-js";
import { DuplicateFrom } from "./DuplicateFrom";
import { ProfileInput } from "./Input";

export function AddForm() {
  const [name, setName] = createSignal("");
  const [duplicateFrom, setDuplicateFrom] = createSignal<string>();
  const [error, setError] = createSignal("");

  const handleSave = () => {
    if (!name()) {
      setError("Введите название профиля");
    }
    console.log("save", name(), duplicateFrom());
  };

  return (
    <form
      class={"col gap-3"}
      onSubmit={(e) => {
        e.preventDefault();

        handleSave();
      }}
    >
      <h4>Создать новый профиль:</h4>
      <ProfileInput error={error} name={name} setError={setError} setName={setName} />
      <DuplicateFrom setDuplicateFrom={setDuplicateFrom} />
      <button class={"btn btn-primary btn-sm"} type={"submit"}>
        Создать
      </button>
    </form>
  );
}
