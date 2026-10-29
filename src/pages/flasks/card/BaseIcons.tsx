import { createMemo, For, Show, useContext } from "solid-js";
import { BaseDialog } from "../bases/BaseDialog";
import { FlaskWindowContext } from "../context";
import { FLASK_KINDS, flaskData } from "../data";

export function BaseIcons() {
  const { selectBases, state } = useContext(FlaskWindowContext);
  const bases = createMemo(() => flaskData.bases.filter((base) => state().bases.includes(base.id)));
  const kinds = createMemo(() => {
    const ownKind = bases()[0]?.kind;
    return ownKind === undefined ? FLASK_KINDS : [ownKind];
  });
  let dialog!: HTMLDialogElement;

  return (
    <div class="col gap-3">
      <div class="flex flex-wrap items-start justify-center gap-x-1 gap-y-2">
        <For each={bases()}>
          {(base, index) => (
            <>
              <Show when={index() > 0}>
                <span class="self-center pb-8 text-xs text-base-content/50">или</span>
              </Show>
              <button
                aria-label={`Убрать ${base.name}`}
                class="group relative col w-18 items-center gap-1 rounded-box p-1 hover:bg-base-100"
                onClick={() => selectBases([base.id], false)}
                type="button"
              >
                <img alt="" class="h-18 w-auto transition-opacity group-hover:opacity-50" src={`/icons/flasks/${base.id}.webp`} />
                <span class="text-center text-xs leading-tight">{base.name}</span>
                <span class="btn btn-circle btn-sm btn-error pointer-events-none absolute top-7 opacity-0 transition-opacity group-hover:opacity-100">
                  ✕
                </span>
              </button>
            </>
          )}
        </For>
        <button
          class="col min-h-28 w-18 items-center self-stretch justify-center gap-1 rounded-box border-2 border-dashed border-base-content/20 text-base-content/50 hover:border-base-content/40 hover:text-base-content"
          onClick={() => dialog.showModal()}
          title="Добавить базу"
          type="button"
        >
          <span class="text-4xl leading-none">+</span>
          <Show when={bases().length === 0}>
            <span class="px-1 text-center text-xs">Любой флакон. Нажмите, чтобы выбрать базу</span>
          </Show>
        </button>
      </div>
      <BaseDialog kinds={kinds()} onSelect={selectBases} ref={dialog} selected={state().bases} title="Базы окна">
        <form class="modal-action m-0" method="dialog">
          <button class="btn btn-primary btn-sm" type="submit">
            Готово
          </button>
        </form>
      </BaseDialog>
    </div>
  );
}
