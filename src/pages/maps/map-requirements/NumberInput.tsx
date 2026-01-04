import type { Accessor, ParentProps } from "solid-js";

export function NumberInput({
  value,
  children,
  updateStore,
  min,
  max,
}: ParentProps<{
  min?: number;
  max?: number;
  value: Accessor<number | undefined>;
  updateStore: (value: number | undefined) => void;
}>) {
  const handleInput = (e: { target: { value: string } }) => {
    const value = e.target.value;
    updateStore(value ? +value : undefined);
  };

  return (
    <input
      class="input w-16 h-8 rounded-sm"
      classList={{ "input-primary": value() !== undefined }}
      max={max}
      min={min ?? 0}
      onInput={handleInput}
      placeholder={children?.toString()}
      type="number"
      value={value() ?? ""}
    />
  );
}
