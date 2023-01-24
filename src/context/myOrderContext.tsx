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

import {
  EOrderType,
  IAddress,
  ICustomer,
  IOrder,
  IPayment,
} from "../types/order";

const MyOrderContext = createContext<{
  myOrder: IOrder;
  setMyOrder: (newOrder: IOrder) => void; // Dispatch<SetStateAction<IOrder | null>>;
  addItem: (item: IItem | IItem[]) => void;
  addPayment: (payment: IPayment | IPayment[]) => void;
  removeItem: (itemId: string) => void;
  removePayment: (PaymentId: string) => void;
  removeAllPayments: () => void;
  setInfo: (customer: ICustomer, type: EOrderType, fee: number) => void;
  setFee: (fee: number) => void;
}>(null);

const MyOrderProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [myOrder, setMyOrder] = useState<IOrder | null>(null);

  const EmptyAddress: IAddress = {
    number: "",
    street: "",
    cep: "",
    place: "",
    reference: "",
  };

  const EmptyOrder: IOrder = {
    items: [],
    type: null,
    customer: { name: "", whatsapp: "", address: EmptyAddress },
    fee: 0,
    date: new Date(),
    payments: [],
  };

  useEffect(() => {
    // localStorage.removeItem("customer");
    // localStorage.removeItem("myOrder");
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
  const addPayment = (payment: IPayment | IPayment[]) => {
    const payments = Array.isArray(payment) ? payment : [payment];
    saveMyOrderLocalAndState({
      ...myOrder,
      payments: [...myOrder.payments, ...payments],
    });
  };

  const removeItem = (itemId: string) => {
    saveMyOrderLocalAndState({
      ...myOrder,
      items: myOrder.items.filter((i) => i.id !== itemId),
    });
  };

  const removePayment = (paymentId: string) => {
    saveMyOrderLocalAndState({
      ...myOrder,
      payments: myOrder.payments.filter((i) => i.id !== paymentId),
    });
  };

  const saveMyOrderLocalAndState = (newOrder: IOrder) => {
    localStorage.setItem("myOrder", JSON.stringify(newOrder));
    setMyOrder(newOrder);
  };

  const setInfo = (customer: ICustomer, type: EOrderType, fee: number) => {
    const localCustomer =
      (JSON.parse(localStorage.getItem("customer")) as ICustomer) ?? null;
    const newLocalCustomer: ICustomer = {
      name: customer.name === "" ? localCustomer?.name ?? "" : customer.name,
      address:
        customer.address.street === ""
          ? localCustomer?.address ?? EmptyAddress
          : customer.address,
      whatsapp:
        customer.whatsapp === ""
          ? localCustomer?.whatsapp ?? ""
          : customer.whatsapp,
    };

    localStorage.setItem("customer", JSON.stringify(newLocalCustomer));

    saveMyOrderLocalAndState({
      ...myOrder,
      customer,
      type,
      fee,
    });
  };

  const setFee = (fee: number) => {
    saveMyOrderLocalAndState({
      ...myOrder,
      fee,
    });
  };

  const removeAllPayments = () => {
    saveMyOrderLocalAndState({ ...myOrder, payments: [] });
  };

  return (
    <MyOrderContext.Provider
      value={{
        myOrder,
        setMyOrder: saveMyOrderLocalAndState,
        addItem,
        addPayment,
        removeItem,
        removePayment,
        removeAllPayments,
        setInfo,
        setFee,
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
