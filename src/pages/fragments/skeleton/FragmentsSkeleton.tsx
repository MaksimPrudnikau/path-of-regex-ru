import { Index } from "solid-js";

export function FragmentsSkeleton() {
  return (
    <main aria-busy="true" class="w-full p-4 col gap-4">
      <span class="sr-only">Загружаем фрагменты и цены</span>
      <h2 class="max-[550px]:hidden">Регулярное выражение для поиска фрагментов:</h2>
      <div class="skeleton h-40 w-full" />
      <div class="skeleton h-10 w-96 max-w-full" />
      <div class="skeleton h-28 w-full" />
      <div class="grid gap-8 lg:grid-cols-2">
        <Index each={[0, 1]}>
          {() => (
            <div class="col gap-2">
              <Index each={Array.from({ length: 6 })}>{() => <div class="skeleton h-12 w-full" />}</Index>
            </div>
          )}
        </Index>
      </div>
    </main>
  );
}
