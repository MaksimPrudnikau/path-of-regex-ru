import type { PriceSnapshot } from "~/lib/prices";
import { FragmentsContextProvider } from "./context";
import { FragmentsPage } from "./FragmentsPage";

export function FragmentsApp(props: { prices: PriceSnapshot }) {
  return (
    <FragmentsContextProvider prices={props.prices}>
      <FragmentsPage />
    </FragmentsContextProvider>
  );
}
