import { createSignal, useContext } from "solid-js";
import { ProfileControlsContext } from "../../context";
import { ButtonMenu } from "../ButtonMenu";
import { EditForm } from "./Form";

export function Edit() {
  const [opened, setOpened] = createSignal(false);
  const { editProfile } = useContext(ProfileControlsContext);

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
