import { useContext } from "solid-js";
import { BaseDialog } from "../bases/BaseDialog";
import { FlasksContext } from "../context";
import { FLASK_KINDS } from "../data";

export function NewWindowButton() {
  const { addWindow } = useContext(FlasksContext);
  let dialog!: HTMLDialogElement;

  return (
    <>
      <button class="btn btn-outline h-36 w-40 shrink-0 self-center border-dashed" onClick={() => dialog.showModal()} type="button">
        + Добавить окно
      </button>
      <BaseDialog
        kinds={FLASK_KINDS}
        onSelect={(baseIds) => {
          addWindow(baseIds);
          dialog.close();
        }}
        ref={dialog}
        selected={[]}
        title="Выберите базу для нового окна"
      />
    </>
  );
}
