type Props = {
  value: string;
  setValue: (value: string) => void;
};

export function SearchInput(props: Props) {
  return (
    <label class="input">
      <input
        onInput={(e) => {
          props.setValue(e.target.value);
        }}
        placeholder="Модификатор"
        required
        type="search"
        value={props.value}
      />
    </label>
  );
}
