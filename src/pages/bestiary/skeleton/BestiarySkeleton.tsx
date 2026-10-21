import { ColumnSkeleton } from "./ColumnSkeleton";

export function BestiarySkeleton() {
  return (
    <main aria-busy="true" class="w-full p-4 col gap-4">
      <span class="sr-only">Загружаем бестиарий и цены</span>
      <h2 class="max-[550px]:hidden">Регулярное выражение для поиска зверей:</h2>
      <section class="card bg-base-200">
        <div class="card-body gap-3 p-5">
          <div class="skeleton h-8 w-3/4" />
          <div class="flex flex-wrap items-center gap-3">
            <div class="skeleton h-10 w-36" />
            <div class="skeleton h-10 w-28" />
            <div class="skeleton h-6 w-44" />
            <div class="skeleton h-4 w-24 ml-auto" />
          </div>
        </div>
      </section>
      <section class="card bg-base-200">
        <div class="card-body gap-3 p-5">
          <div class="skeleton h-6 w-40" />
          <div class="skeleton h-8 w-full max-w-xl" />
          <div class="skeleton h-8 w-full max-w-2xl" />
        </div>
      </section>
      <div class="skeleton h-10 w-full" />
      <div class="grid gap-8 lg:grid-cols-2">
        <ColumnSkeleton blockClass="h-20 w-full" count={6} title="Рецепты" />
        <ColumnSkeleton blockClass="h-12 w-40" count={14} title="Звери" wrap />
      </div>
    </main>
  );
}
