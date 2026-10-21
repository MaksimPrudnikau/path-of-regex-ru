import { BestiaryPage } from "./BestiaryPage";
import { BestiaryContextProvider } from "./context";
import type { PriceSnapshot } from "./price/prices";

export function BestiaryApp(props: { prices: PriceSnapshot }) {
  return (
    <BestiaryContextProvider prices={props.prices}>
      <BestiaryPage />
    </BestiaryContextProvider>
  );
}
