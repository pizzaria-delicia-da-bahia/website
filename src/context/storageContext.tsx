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

import { IOrder } from "../types/order";

const StorageContext = createContext<{
  myOrder: IOrder;
  setMyOrder: Dispatch<SetStateAction<IOrder | null>>;
}>(null);

const StorageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [myOrder, setMyOrder] = useState<IOrder | null>();

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
