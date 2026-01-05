import { Add } from "./buttons/add/Add";
import { Edit } from "./buttons/edit/Edit";
import { Remove } from "./buttons/Remove";

export function ProfileButtons() {
  return (
    <div class={"row"}>
      <Edit />
      <Add />
      <Remove />
    </div>
  );
}
