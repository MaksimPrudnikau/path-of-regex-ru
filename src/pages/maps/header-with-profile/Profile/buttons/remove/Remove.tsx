import { useContext } from "solid-js";
import { MapsProfileContext } from "~/pages/maps/context";

export function Remove() {
  const { profiles, removeProfile } = useContext(MapsProfileContext);

  let dialogElement!: HTMLDialogElement;
  const isSingleProfile = () => profiles().size <= 1;

  const onClick = () => {
    dialogElement.showModal();
  };

  const handleRemove = () => {
    if (isSingleProfile()) {
      return;
    }

    removeProfile();
    dialogElement.close();
  };

  return (
    <>
      <button
        class="btn btn-ghost p-1 w-fit h-fit text-base-content"
        classList={{
          "opacity-10 cursor-not-allowed": isSingleProfile(),
        }}
        disabled={isSingleProfile()}
        onClick={onClick}
        type={"button"}
      >
        <img
          alt={"remove"}
          class={"min-w-5 min-h-5"}
          height={20}
          src={"/svg/remove.svg"}
        />
      </button>
      <dialog class="modal" id="my_modal_1" ref={dialogElement}>
        <div class="modal-box">
          <h3 class="text-lg font-bold">Вы уверены?</h3>
          <p class="py-4">Это действие нельзя отменить</p>
          <div class="modal-action m-0">
            <form
              method="dialog"
              onSubmit={(e) => {
                e.preventDefault();
                handleRemove();
              }}
            >
              <button class="btn btn-secondary" type={"submit"}>
                Удалить
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
