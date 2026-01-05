import { createSignal } from "solid-js";
import { ButtonMenu } from "../ButtonMenu";
import { EditForm } from "./Form";

type Props = {
  handleSave: (name: string, duplicateFrom?: string) => void;
};

export function Edit(props: Props) {
  const [opened, setOpened] = createSignal(false);

  const handleSave = (name: string) => {
    setOpened(false);

    props.handleSave(name);
  };

  return (
    <ButtonMenu alt={"edit"} opened={opened} setOpened={setOpened} src={"/svg/edit.svg"}>
      <EditForm onSubmit={handleSave} />
    </ButtonMenu>
  );
}
