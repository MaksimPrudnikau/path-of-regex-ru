import { type ParentProps, useContext } from "solid-js";
import { type FlaskWindow, FlasksContext, FlaskWindowContext } from "../context";

type Props = {
  window: FlaskWindow;
};

export function FlaskWindowProvider(props: ParentProps<Props>) {
  const { selectBases, updateWindow } = useContext(FlasksContext);
  const update = (patch: Partial<FlaskWindow>) => updateWindow(props.window.id, patch);

  return (
    <FlaskWindowContext.Provider
      value={{
        replaceMod: (oldId, newId) => {
          const entries = Object.entries(props.window.mods).map(([id, tiers]) => (id === oldId ? [newId, []] : [id, tiers]));
          update({ mods: Object.fromEntries(entries) });
        },
        selectBases: (ids, selected) => selectBases(props.window.id, ids, selected),
        setTiers: (modId, tiers) => {
          const { [modId]: _, ...rest } = props.window.mods;
          update({ mods: tiers === undefined ? rest : { ...props.window.mods, [modId]: tiers } });
        },
        state: () => props.window,
        tiersOf: (modId) => props.window.mods[modId],
        update,
      }}
    >
      {props.children}
    </FlaskWindowContext.Provider>
  );
}
