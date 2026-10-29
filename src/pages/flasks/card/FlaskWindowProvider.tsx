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
        replaceMod: (oldId, newId, tierCount) => {
          const entries = Object.entries(props.window.mods).map(([id, count]) => (id === oldId ? [newId, tierCount] : [id, count]));
          update({ mods: Object.fromEntries(entries) });
        },
        selectBases: (ids, selected) => selectBases(props.window.id, ids, selected),
        setTierCount: (modId, tierCount) => {
          const { [modId]: _, ...rest } = props.window.mods;
          update({ mods: tierCount === undefined ? rest : { ...props.window.mods, [modId]: tierCount } });
        },
        state: () => props.window,
        tierCountOf: (modId) => props.window.mods[modId],
        update,
      }}
    >
      {props.children}
    </FlaskWindowContext.Provider>
  );
}
