type Props = {
  label: string;
  value: number | undefined;
  onChange: (value: number | null) => void;
};

export function ChaosField(props: Props) {
  return (
    <label class="flex items-center gap-1.5">
      <input
        aria-label={props.label}
        class="input input-sm w-20 text-center"
        min="0"
        onChange={(e) => props.onChange(e.currentTarget.value === "" ? null : Number(e.currentTarget.value))}
        step="any"
        type="number"
        value={props.value ?? ""}
      />
      <img alt="хаос" class="size-5" src="/icons/chaos.png" />
    </label>
  );
}
