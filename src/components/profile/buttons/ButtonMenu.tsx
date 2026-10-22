import type { Accessor, ParentProps } from "solid-js";

type Props = {
  alt: string;
  src: string;
  opened: Accessor<boolean>;
  setOpened: (val: boolean) => void;
};

export function ButtonMenu(props: ParentProps<Props>) {
  return (
    <div
      class="dropdown dropdown-end"
      classList={{
        "dropdown-close": !props.opened(),
      }}
    >
      <button
        class="btn btn-ghost p-1 w-fit h-fit"
        onClick={() => props.setOpened(true)}
        tabIndex="0"
        type={"button"}
      >
        <img alt={props.alt} class={"min-w-5 min-h-5"} height={20} src={props.src} />
      </button>
      <ul
        class="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm border-primary"
        tabIndex="-1"
      >
        {props.children}
      </ul>
    </div>
  );
}
