import { PricePicker } from "~/components/price";

export function SelectionPanel() {
  return (
    <section class="card bg-base-200">
      <div class="card-body gap-3 p-5">
        <h3 class="text-lg">Подбор по цене</h3>
        <PricePicker />
        <p class="text-xs text-base-content/60">
          Диапазон цен сохраняется при переключении вкладок: предметы из него сразу попадают в список «Включить». Цены сразу загружены для всех вкладок.
        </p>
      </div>
    </section>
  );
}
