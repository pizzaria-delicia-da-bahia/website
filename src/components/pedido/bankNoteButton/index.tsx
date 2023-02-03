import Image from "next/image";
import { ButtonBankNoteStyle } from "./styles";

export const ButtonBankNote = ({
  value,
  click,
  selected,
  disabled,
}: {
  value: number;
  selected: boolean;
  disabled: boolean;
  click: (value) => void;
}) => {
  return (
    <ButtonBankNoteStyle
      disabled={disabled}
      className={`change c${value}${selected && " selected"}`}
      onClick={() => click(value)}
    >
      <Image src={`/images/c${value}.ico`} layout={"fill"} />
    </ButtonBankNoteStyle>
  );
};
