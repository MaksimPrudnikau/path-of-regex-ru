type Props = {
  isAnd: boolean;
  onChange: (isAnd: boolean) => void;
  title: string;
};

export function JoinToggle(props: Props) {
  return (
    <div class="join" title={props.title}>
      <button
        aria-pressed={props.isAnd}
        class="btn join-item min-w-20 uppercase"
        classList={{ "btn-primary": props.isAnd, "btn-ghost border-base-content/20": !props.isAnd }}
        onClick={() => props.onChange(true)}
        type="button"
      >
        и
      </button>
      <button
        aria-pressed={!props.isAnd}
        class="btn join-item min-w-20 uppercase"
        classList={{ "btn-primary": !props.isAnd, "btn-ghost border-base-content/20": props.isAnd }}
        onClick={() => props.onChange(false)}
        type="button"
      >
        или
      </button>
    </div>
  );
}
