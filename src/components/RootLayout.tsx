import type { RouteSectionProps } from "@solidjs/router";
import { Suspense } from "solid-js";
import { Header } from "~/components/Header";

export function RootLayout(props: RouteSectionProps) {
  return (
    <div class={"w-full"}>
      <Header />
      <Suspense>{props.children}</Suspense>
    </div>
  );
}
