import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { IPedido } from "../types/order";

const StorageContext = createContext<{
  myOrder: IPedido;
  setMyOrder: Dispatch<SetStateAction<IPedido | null>>;
}>(null);

const StorageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [myOrder, setMyOrder] = useState<IPedido | null>();

  useEffect(() => {
    const order = localStorage.getItem("myOrder");
  }, []);

  return (
    <StorageContext.Provider value={{ myOrder, setMyOrder }}>
      {children}
    </StorageContext.Provider>
  );
};
export default StorageProvider;

export const useStorage = () => {
  return useContext(StorageContext);
};
