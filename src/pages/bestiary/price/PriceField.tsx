import { createMemo, useContext } from "solid-js";
import { BestiaryContext } from "../context";
import { CURRENCIES, toUnit } from "./currency";

type Props = {
  label: string;
  value: number | undefined;
  onChange: (chaos: number | null) => void;
};

export function PriceField(props: Props) {
  const { chaosPerUnit, currency } = useContext(BestiaryContext);
  const unit = createMemo(() => CURRENCIES[currency()]);

  return (
    <label class="flex items-center gap-1.5">
      <input
        aria-label={props.label}
        class="input input-sm w-20 text-center"
        min="0"
        onChange={(e) => props.onChange(e.currentTarget.value === "" ? null : Number(e.currentTarget.value) * chaosPerUnit())}
        step="any"
        type="number"
        value={props.value === undefined ? "" : toUnit(props.value, chaosPerUnit())}
      />
      <img alt={unit().label} class="size-5" src={unit().icon} />
    </label>
  );
}
