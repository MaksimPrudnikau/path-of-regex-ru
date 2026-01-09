import { type Accessor, createMemo, type ParentProps } from "solid-js";

export function NumberInput({
  value,
  children,
  updateStore,
  min,
  max,
}: ParentProps<{
  min: number | undefined;
  max: number | undefined;
  value: Accessor<number | undefined>;
  updateStore: (value: number | undefined) => void;
}>) {
  const handleInput = (e: { target: { value: string } }) => {
    const value = e.target.value;
    updateStore(value ? +value : undefined);
  };

  const hasOwnError = createMemo(() => {
    if (!value() || !min) {
      return false;
    }

    if (value()! < (min ?? 0)) {
      return true;
    }

    if (!max) {
      return false;
    }

    if (max! < (min ?? 0)) {
      return true;
    }

    return max! > 999;
  });

  return (
    <input
      class="input w-16 h-8 rounded-sm"
      classList={{
        "border-red-500": hasOwnError(),
        "input-primary": !hasOwnError() && !!value(),
      }}
      max={max}
      min={min ?? 0}
      onInput={handleInput}
      placeholder={children?.toString()}
      type="number"
      value={value() ?? ""}
    />
  );
}
