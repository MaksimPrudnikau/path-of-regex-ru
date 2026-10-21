type Props = {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
};

export function ChaosInput(props: Props) {
  return (
    <label class="input input-sm w-32">
      <span class="label">{props.label}</span>
      <input
        min="0"
        onInput={(e) => props.onChange(e.currentTarget.value === "" ? null : Number(e.currentTarget.value))}
        placeholder="хаос"
        step="any"
        type="number"
        value={props.value ?? ""}
      />
    </label>
  );
}
