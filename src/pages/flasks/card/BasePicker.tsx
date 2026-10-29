import { createMemo, For, useContext } from "solid-js";
import { BaseGroup } from "../bases/BaseGroup";
import { FlaskWindowContext } from "../context";
import { type FlaskKind, flaskData, KIND_LABELS } from "../data";

type Props = {
  onClose: () => void;
};

export function BasePicker(props: Props) {
  const { state } = useContext(FlaskWindowContext);
  const kinds = createMemo(() => {
    const ownKind = flaskData.bases.find((base) => base.id === state().bases[0])?.kind;
    return ownKind === undefined ? (Object.keys(KIND_LABELS) as FlaskKind[]) : [ownKind];
  });

  return (
    <div class="col gap-3 rounded-box border border-base-content/15 bg-base-200 p-4">
      <For each={kinds()}>
        {(kind) => <BaseGroup bases={flaskData.bases.filter((base) => base.kind === kind)} kind={kind} />}
      </For>
      <button class="btn btn-sm self-end" onClick={() => props.onClose()} type="button">
        Готово
      </button>
    </div>
  );
}
