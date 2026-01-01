import type { Accessor } from "solid-js";
import type { MapMod } from "~/api";

type Props = {
  mod: MapMod;
  onClick: () => void;
  isSelected: Accessor<boolean>;
};

export function Mod({ mod, onClick, isSelected }: Props) {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      class="btn text-start p-2 text-wrap justify-start h-fit"
      classList={{ "btn-primary": isSelected() }}
      onClick={handleClick}
      type="button"
    >
      {mod.name}
    </button>
  );
}
