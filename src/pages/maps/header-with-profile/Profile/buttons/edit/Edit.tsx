import { ButtonMenu } from "../ButtonMenu";
import { EditForm } from "./Form";

export function Edit() {
  return (
    <ButtonMenu alt={"edit"} src={"/svg/edit.svg"}>
      <EditForm />
    </ButtonMenu>
  );
}
