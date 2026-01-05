export function Remove() {
  let dialogElement!: HTMLDialogElement;

  const onClick = () => {
    dialogElement.showModal();
  };

  const handleRemove = () => {};
  return (
    <>
      <button class="btn btn-ghost p-1 w-fit h-fit" onClick={onClick} type={"button"}>
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
            <form method="dialog">
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
