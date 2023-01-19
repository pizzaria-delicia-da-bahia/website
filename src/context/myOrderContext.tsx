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

const MyOrderContext = createContext<{
  myOrder: IOrder;
  setMyOrder: Dispatch<SetStateAction<IOrder | null>>;
}>(null);

const MyOrderProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [myOrder, setMyOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    setMyOrder(
      (JSON.parse(localStorage.getItem("myOrder")) as IOrder) ?? {
        items: [],
        address: { neighborhood: "", streetName: "" },
        consumer: { name: "", whatsapp: "" },
        date: Date.now(),
      }
    );
  }, []);

  return (
    <MyOrderContext.Provider value={{ myOrder, setMyOrder }}>
      {children}
    </MyOrderContext.Provider>
  );
};
export default MyOrderProvider;

export const useMyOrder = () => {
  return useContext(MyOrderContext);
};
