type Props = {
  checked: boolean;
  label: string;
  onChange: () => void;
};

export function TierOption(props: Props) {
  return (
    <li>
      <label class="gap-2">
        <input checked={props.checked} class="checkbox checkbox-sm" onChange={props.onChange} type="checkbox" />
        {props.label}
      </label>
    </li>
  );
}
