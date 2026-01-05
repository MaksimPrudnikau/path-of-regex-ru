import { createSignal, useContext } from "solid-js";
import { MapsProfileContext } from "~/pages/maps/context";
import { ButtonMenu } from "../ButtonMenu";
import { AddForm } from "./Form";

export function Add() {
  const [opened, setOpened] = createSignal(false);
  const { addProfile } = useContext(MapsProfileContext);

  const handleSave = (name: string, duplicateFrom?: string) => {
    setOpened(false);
    addProfile(name, duplicateFrom);
  };

  return (
    <ButtonMenu alt={"add"} opened={opened} setOpened={setOpened} src={"/svg/plus.svg"}>
      <AddForm onSubmit={handleSave} />
    </ButtonMenu>
  );
}
