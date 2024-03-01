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
import { usePromo } from "./promoContext";
import ModalPromo2 from "@components/modalPromo2";

const NavigationContext = createContext<{
  menuOpen: Boolean;
  setMenuOpen: Dispatch<SetStateAction<Boolean>>;
  modalPromo: ReactNode;
  setModalPromo: Dispatch<SetStateAction<ReactNode>>;
}>(null);

const NavigationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);
  const { getDuasRefri60 } = usePromo();
  const [modalPromo, setModalPromo] = useState(
    getDuasRefri60() ? (
      <>
        <ModalPromo2
          url="/pedido/promocao-duas"
          image="/images/promo-duas-refri-60-modal.png"
        />
      </>
    ) : (
      <></>
    )
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
