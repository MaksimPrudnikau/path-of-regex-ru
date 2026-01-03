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

  const getRankColor = () => {
    const rank = mod.rank;

    if (rank === 0) {
      return "white";
    } else if (rank <= 50) {
      return "red-200";
    } else if (rank <= 150) {
      return "red-300";
    } else {
      return "red-400";
    }
  };

  const color = () => {
    if (mod.rank >= 700) {
      return isSelected() ? "btn-accent" : "text-accent";
    }

    const baseColor = getRankColor();

    return isSelected() ? `bg-${baseColor} text-black` : `text-${baseColor}`;
  };

  return (
    <button
      class={`btn text-start p-2 text-wrap justify-start h-fit ${color()}`}
      classList={{
        "btn-accent": mod.rank >= 700 && isSelected(),
      }}
      onClick={handleClick}
      type="button"
    >
      {mod.name}
    </button>
  );
}
