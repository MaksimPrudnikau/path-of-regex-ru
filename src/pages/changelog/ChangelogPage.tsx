import { For } from "solid-js";
import { releases } from "./releases";

export function ChangelogPage() {
  return (
    <main class="w-full max-w-3xl p-4 col gap-4">
      <h2 class="text-2xl font-semibold">Что нового</h2>
      <For each={releases}>
        {(release) => (
          <section class="card bg-base-200">
            <div class="card-body gap-2 p-5">
              <h3 class="card-title items-baseline">
                Версия {release.version}
                <span class="text-sm font-normal text-base-content/60">{formatReleaseDate(release.date)}</span>
              </h3>
              <ul class="list-disc pl-5 space-y-1">
                <For each={release.changes}>
                  {(change) => <li>{typeof change === "string" ? change : change()}</li>}
                </For>
              </ul>
            </div>
          </section>
        )}
      </For>
    </main>
  );
}

function formatReleaseDate(date: string): string {
  return new Date(date).toLocaleDateString("ru", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
