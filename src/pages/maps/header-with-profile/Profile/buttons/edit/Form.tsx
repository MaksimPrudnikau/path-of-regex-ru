import { createSignal } from "solid-js";
import { ProfileInput } from "../add/Input";

export function EditForm() {
  const [name, setName] = createSignal("");
  const [error, setError] = createSignal("");

  const handleSave = () => {
    if (!name()) {
      setError("Введите название профиля");
    }
  };

  return (
    <form
      class={"col gap-3"}
      onSubmit={(e) => {
        e.preventDefault();

        handleSave();
      }}
    >
      <h4>Редактировать профиль:</h4>
      <ProfileInput error={error} name={name} setError={setError} setName={setName} />
      <button class={"btn btn-primary btn-sm"} type={"submit"}>
        Сохранить
      </button>
    </form>
  );
}
