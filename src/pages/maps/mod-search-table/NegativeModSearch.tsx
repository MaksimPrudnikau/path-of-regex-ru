import { type Accessor, createEffect, createMemo } from 'solid-js'
import { unwrap } from 'solid-js/store'
import type { MapMod } from '~/api'
import { ModSearch } from './mod-search/ModSearch'

type Props = {
  mods: Accessor<MapMod[]>;
};

export function NegativeModSearch({ mods }: Props) {
  const sortedMods = createMemo(() => mods().sort((a, b) => b.rank - a.rank));

  createEffect(() => {
    console.log(unwrap(sortedMods()));
  });

  return (
    <ModSearch
      model={"negativeMods"}
      mods={sortedMods}
      title={
        <>
          <span class={"font-bold uppercase text-red-500/80"}>исключить </span>
          <span>эти модификаторы</span>
        </>
      }
    />
  );
}
