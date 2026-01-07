import { createSignal, useContext } from "solid-js";
import { MapsProfileContext } from "~/pages/maps/context";
import { ButtonMenu } from "../ButtonMenu";
import { EditForm } from "./Form";

export function Edit() {
  const [opened, setOpened] = createSignal(false);
  const { editProfile } = useContext(MapsProfileContext);

  const handleSave = (name: string) => {
    setOpened(false);

    editProfile(name);
  };

  return (
    <ButtonMenu alt={"edit"} opened={opened} setOpened={setOpened} src={"/svg/edit.svg"}>
      <EditForm onSubmit={handleSave} />
    </ButtonMenu>
  );
}
