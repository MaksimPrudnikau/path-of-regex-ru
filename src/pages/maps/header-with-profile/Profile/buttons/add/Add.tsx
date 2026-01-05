import { ButtonMenu } from "../ButtonMenu";
import { AddForm } from "./Form";

export function Add() {
  return (
    <ButtonMenu alt={"add"} src={"/svg/plus.svg"}>
      <AddForm />
    </ButtonMenu>
  );
}
