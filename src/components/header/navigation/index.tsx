import { Dispatch, FC, SetStateAction } from "react";
import { NavigationStyle } from "./styles";
import { navigationItems } from "../../../data/navigationItems";
import NaviItem from "./navitem";
import { PecaJaButton } from "../../pecaja";
import { BurgerButton } from "../burgerButton";
import { useNavigation } from "../../../context/navigationContext";

export const Navigation: FC = () => {
  const { menuOpen, setMenuOpen } = useNavigation();
  return (
    <NavigationStyle menuOpen={menuOpen}>
      <ul>
        {navigationItems.map((navigationItem) => (
          <NaviItem key={navigationItem.route} item={navigationItem} />
        ))}
        <PecaJaButton
          closeMenu={() => setMenuOpen(false)}
          key={"pecaja"}
          style="minimal"
        />
      </ul>
      <BurgerButton setMenuOpen={setMenuOpen} />
    </NavigationStyle>
  );
};
