import { FC, InputHTMLAttributes } from "react";
import { ToggleStyle } from "./style";

export const Toggle = ({
  checked,
  toggle,
}: {
  checked: boolean;
  toggle: () => void;
}) => {
  return (
    <ToggleStyle
      className={checked ? "checked" : undefined}
      onClick={() => toggle()}
    >
      <div id="toggle">
        <div id="dot"></div>
      </div>
    </ToggleStyle>
  );
};
