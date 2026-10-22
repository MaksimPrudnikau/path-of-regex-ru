import { createSignal } from "solid-js";
import { DuplicateFrom } from "./DuplicateFrom";
import { ProfileInput } from "./Input";

type Props = {
  onSubmit: (name: string, duplicateFrom?: string) => void;
};

export function AddForm(props: Props) {
  const [name, setName] = createSignal("");
  const [duplicateFrom, setDuplicateFrom] = createSignal<string>();
  const [error, setError] = createSignal("");

  const handleSave = () => {
    if (!name()) {
      setError("Введите название профиля");
    }

    props.onSubmit(name(), duplicateFrom());
    setName("");
    setDuplicateFrom("");
  };

  let form!: HTMLFormElement;

  return (
    <form
      class={"col gap-3"}
      onSubmit={(e) => {
        e.preventDefault();

        handleSave();
        form.reset();
      }}
      ref={form}
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
