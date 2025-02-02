import { CgMenu } from "react-icons/cg";
import { BurgerButtonStyle } from "./styles";

export const BurgerButton = ({ setMenuOpen }) => {
  return (
    <BurgerButtonStyle
      id="burger-button"
      name="burger-button"
      onClick={() => setMenuOpen((prev) => !prev)}
    >
      <CgMenu />
    </BurgerButtonStyle>
  );
};
