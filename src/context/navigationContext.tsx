import ModalPromo from "@components/modalPromo";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

const NavigationContext = createContext<{
  menuOpen: Boolean;
  setMenuOpen: Dispatch<SetStateAction<Boolean>>;
  modalPromo: ReactNode;
  setModalPromo: Dispatch<SetStateAction<ReactNode>>;
}>(null);

const NavigationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);
  const [modalPromo, setModalPromo] = useState(
    <>
      {/* <ModalPromo goItURL="/pedido/promocao-relampago" /> */}
    </>
  );

  return (
    <NavigationContext.Provider
      value={{ menuOpen, setMenuOpen, modalPromo, setModalPromo }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
export default NavigationProvider;

export const useNavigation = () => {
  return useContext(NavigationContext);
};
