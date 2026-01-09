import { useContext } from "solid-js";
import type { KeyOfType } from "~/lib/key-of-type";
import { MapsProfileContext } from "~/pages/maps/context";
import { IncludeMapType, type MapsStore } from "~/pages/maps/context/maps";

type Props = {
  model: KeyOfType<MapsStore, IncludeMapType>;
};

export function ExcludeFilter({ model }: Props) {
  const { currentProfile, updateProfile } = useContext(MapsProfileContext);

  const update = (value: IncludeMapType) => {
    updateProfile((prev) => ({ ...prev, [model]: value }));
  };

  const isChecked = () => currentProfile()[model] === IncludeMapType.Exclude;
  return (
    <div class={"row gap-2"}>
      <input
        checked={isChecked()}
        class="checkbox rounded-md"
        classList={{
          "checkbox-secondary": isChecked(),
        }}
        onChange={() =>
          update(isChecked() ? IncludeMapType.Include : IncludeMapType.Exclude)
        }
        type="checkbox"
      />
      <span class={"text-secondary"}>Исключить</span>
    </div>
  );
}
