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
import { IItem } from "../types/item";

import { IOrder } from "../types/order";

const MyOrderContext = createContext<{
  myOrder: IOrder;
  setMyOrder: (newOrder: IOrder) => void; // Dispatch<SetStateAction<IOrder | null>>;
  addItem: (item: IItem | IItem[]) => void;
  removeItem: (itemId: string) => void;
}>(null);

const MyOrderProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [myOrder, setMyOrder] = useState<IOrder | null>(null);

  const EmptyOrder: IOrder = {
    items: [],
    address: { neighborhood: "", streetName: "" },
    consumer: { name: "", whatsapp: "" },
    date: new Date(),
  };

  useEffect(() => {
    const fromLocal = JSON.parse(localStorage.getItem("myOrder")) as IOrder;
    const getTimeDiffInHours = (date: Date) =>
      (new Date().getTime() - date.getTime()) / 1000 / 60 / 60;
    if (!fromLocal || getTimeDiffInHours(new Date(fromLocal?.date)) > 1) {
      setMyOrder(EmptyOrder);
    } else {
      setMyOrder((fromLocal as IOrder) ?? EmptyOrder);
    }
  }, []);

  const addItem = (item: IItem | IItem[]) => {
    const itens = Array.isArray(item) ? item : [item];
    saveMyOrderLocalAndState({
      ...myOrder,
      items: [...myOrder.items, ...itens],
    });
  };

  const removeItem = (itemId: string) => {
    console.log("item id", itemId);
    saveMyOrderLocalAndState({
      ...myOrder,
      items: myOrder.items.filter((i) => i.id !== itemId),
    });
  };

  const saveMyOrderLocalAndState = (newOrder: IOrder) => {
    localStorage.setItem("myOrder", JSON.stringify(newOrder));
    setMyOrder(newOrder);
  };

  return (
    <MyOrderContext.Provider
      value={{
        myOrder,
        setMyOrder: saveMyOrderLocalAndState,
        addItem,
        removeItem,
      }}
    >
      {children}
    </MyOrderContext.Provider>
  );
};
export default MyOrderProvider;

export const useMyOrder = () => {
  return useContext(MyOrderContext);
};
