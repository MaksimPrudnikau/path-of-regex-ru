type Props = {
  alt: string;
};

export function Button() {
  return (
    <button class={"btn btn-ghost w-fit h-fit p-1"} type={"button"}>
      <img alt={"add"} class={"min-w-5 min-h-5"} height={20} src={"/svg/plus.svg"} />
    </button>
  );
}
