type Props = {
  setDuplicateFrom: (value: string) => void;
};

export function DuplicateFrom(props: Props) {
  return (
    <div class={"col gap-2"}>
      <span class={"text-sm"}>или дублировать из:</span>
      <select
        class="select appearance-none select-sm"
        name={"duplicateFrom"}
        onChange={(e) => props.setDuplicateFrom(e.target.value)}
      >
        <option disabled selected>
          Pick a color
        </option>
        <option>Crimson</option>
        <option>Amber</option>
        <option>Velvet</option>
      </select>
    </div>
  );
}
