import { For, type ParentProps, type Ref } from "solid-js";
import type { FlaskKind } from "../data";
import { BaseGroup } from "./BaseGroup";

type Props = ParentProps<{
  ref: Ref<HTMLDialogElement>;
  title: string;
  kinds: FlaskKind[];
  selected: string[];
  onSelect: (baseIds: string[], selected: boolean) => void;
}>;

export function BaseDialog(props: Props) {
  return (
    <dialog class="modal" ref={props.ref}>
      <div class="modal-box col max-w-3xl gap-4">
        <h3 class="text-lg font-bold">{props.title}</h3>
        <For each={props.kinds}>{(kind) => <BaseGroup kind={kind} onSelect={props.onSelect} selected={props.selected} />}</For>
        {props.children}
      </div>
      <form class="modal-backdrop" method="dialog">
        <button type="submit">Закрыть</button>
      </form>
    </dialog>
  );
}
