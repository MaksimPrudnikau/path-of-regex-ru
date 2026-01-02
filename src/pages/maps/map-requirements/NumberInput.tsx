import type { ParentProps } from "solid-js";

export function NumberInput({
  children,
  value,
  updateStore,
}: ParentProps<{
  value?: number;
  updateStore: (value: number | undefined) => void;
}>) {
  const handleInput = (e: { target: { value: string } }) => {
    const value = e.target.value;
    updateStore(value ? +value : undefined);
  };

  return (
    <input
      class="input w-16 h-8 rounded-sm"
      onInput={handleInput}
      placeholder={children?.toString()}
      type="number"
      value={value?.toString()}
    />
  );
}
