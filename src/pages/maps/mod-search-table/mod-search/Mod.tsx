/** biome-ignore-all assist/source/useSortedKeys: <explanation> Стили отсортированы в нужном порядке */
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
      class={`btn text-start p-2 text-wrap justify-start h-fit`}
      classList={{
        "text-white": mod.rank === 0 && !isSelected(),
        "text-black": mod.rank < 700 && isSelected(),
        "text-red-200": mod.rank > 0 && mod.rank <= 50 && !isSelected(),
        "text-red-300": mod.rank > 50 && mod.rank <= 150 && !isSelected(),
        "text-red-400": mod.rank > 150 && mod.rank < 700 && !isSelected(),

        "bg-white": mod.rank === 0 && isSelected(),
        "bg-red-200 text-black": mod.rank > 0 && mod.rank <= 50 && isSelected(),
        "bg-red-300 text-black": mod.rank > 50 && mod.rank <= 150 && isSelected(),
        "bg-red-400 text-black": mod.rank > 150 && mod.rank < 700 && isSelected(),

        "text-accent": mod.rank >= 700 && !isSelected(),
        "btn-accent": mod.rank >= 700 && isSelected(),
      }}
      onClick={handleClick}
      type="button"
    >
      {mod.name}
    </button>
  );
}
