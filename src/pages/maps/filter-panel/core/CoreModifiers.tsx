import { AdditionalLootModifiers, BasicModifiers, MonstersModifiers } from "./modifiers";

export function CoreModifiers() {
  return (
    <>
      <BasicModifiers />
      <MonstersModifiers />
      <AdditionalLootModifiers />
    </>
  );
}
