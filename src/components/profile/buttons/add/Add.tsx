import { createSignal, useContext } from "solid-js";
import { ProfileControlsContext } from "../../context";
import { ButtonMenu } from "../ButtonMenu";
import { AddForm } from "./Form";

export function Add() {
  const [opened, setOpened] = createSignal(false);
  const { addProfile } = useContext(ProfileControlsContext);

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
