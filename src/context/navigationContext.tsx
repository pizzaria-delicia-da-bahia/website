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
}>(null);

const NavigationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<Boolean>(false);
  return (
    <NavigationContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </NavigationContext.Provider>
  );
};
export default NavigationProvider;

export const useNavigation = () => {
  return useContext(NavigationContext);
};
