import { PricePicker } from "../price/PricePicker";
import { BeastFilters } from "./BeastFilters";

export function SelectionPanel() {
  return (
    <section class="card bg-base-200">
      <div class="card-body gap-3 p-5">
        <h3 class="text-lg">Подбор зверей</h3>
        <BeastFilters />
        <PricePicker />
        <p class="text-xs text-base-content/60">
          Фильтры действуют на список зверей и на выбор по цене. Если задан диапазон цен, выбор сразу заменяется зверями из него.
        </p>
      </div>
    </section>
  );
}
