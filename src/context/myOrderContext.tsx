import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { IItem } from "@models/item";
import { format } from "date-fns";

import { IEnderecoCliente, ICliente, IPedido, IPagamento } from "@models/order";

const MyOrderContext = createContext<{
  myOrder: IPedido;
  setMyOrder: (newOrder: IPedido) => void; // Dispatch<SetStateAction<IOrder | null>>;
  addItem: (item: IItem | IItem[]) => void;
  addPayment: (payment: IPagamento | IPagamento[]) => void;
  removeItem: (itemId: string) => void;
  removePayment: (PaymentId: string) => void;
  removeAllPayments: () => void;
  setInfo: (
    customer: ICliente,
    type: "retirada" | "entrega" | null,
    fee: number
  ) => void;
  setFee: (fee: number) => void;
  setId: (id: string) => void;
  newOrder: () => void;
}>(null);

const MyOrderProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [myOrder, setMyOrder] = useState<IPedido | null>(null);

  const EmptyAddress: IEnderecoCliente = {
    numero: "",
    rua: "",
    cep: "",
    localDeEntrega: "",
    pontoDeReferencia: "",
    bairroId: "",
  };

  const EmptyOrder: IPedido = {
    id: "",
    itens: [],
    tipo: null,
    cliente: { nome: "", whatsapp: "", endereco: EmptyAddress },
    taxaEntrega: 0,
    data: new Date(),
    pagamentos: [],
  };

  useEffect(() => {
    // localStorage.removeItem("customer");
    // localStorage.removeItem("myOrder");
    const fromLocal = JSON.parse(localStorage.getItem("myOrder")) as IPedido;
    const getTimeDiffInHours = (date: Date) =>
      (new Date().getTime() - date.getTime()) / 1000 / 60 / 60;
    if (!fromLocal || getTimeDiffInHours(new Date(fromLocal?.data)) > 1) {
      localStorage.removeItem("myOrder");
      setMyOrder(EmptyOrder);
    } else {
      setMyOrder((fromLocal as IPedido) ?? EmptyOrder);
    }
  }, []);

  const setId = (id: string) => {
    saveMyOrderLocalAndState({
      ...myOrder,
      id,
    });
  };
  const addItem = (item: IItem | IItem[]) => {
    const itens = Array.isArray(item) ? item : [item];
    const novosItens = [...(myOrder.itens ?? []), ...itens];
    saveMyOrderLocalAndState({
      ...myOrder,
      itens: novosItens,
    });
    toast("Item adicionado!", {
      type: "success",
    });
  };
  const addPayment = (payment: IPagamento | IPagamento[]) => {
    const payments = Array.isArray(payment) ? payment : [payment];
    saveMyOrderLocalAndState({
      ...myOrder,
      pagamentos: [...(myOrder.pagamentos ?? []), ...payments],
    });
  };

  const removeItem = (itemId: string) => {
    const item = myOrder.itens.find((i) => i.id === itemId);

    const combo: IItem[] = !!item.comboId
      ? myOrder.itens.filter((i) => i.comboId === item.comboId)
      : [item];

    saveMyOrderLocalAndState({
      ...myOrder,
      itens: myOrder.itens.filter((i) => combo.every((x) => x.id !== i.id)),
    });
  };

  const removePayment = (paymentId: string) => {
    saveMyOrderLocalAndState({
      ...myOrder,
      pagamentos: myOrder.pagamentos.filter((i) => i.id !== paymentId),
    });
  };

  const saveMyOrderLocalAndState = (newOrder: IPedido) => {
    localStorage.setItem("myOrder", JSON.stringify(newOrder));
    setMyOrder(newOrder);
  };

  const setInfo = (
    customer: ICliente,
    type: "retirada" | "entrega" | null,
    fee: number
  ) => {
    // const localCustomer = (JSON.parse(localStorage.getItem("customer")) as ICliente) ?? null;

    // const newLocalCustomer: ICliente = {
    //   nome: customer.nome === "" ? localCustomer?.nome ?? "" : customer.nome,
    //   endereco:
    //     customer.endereco.rua === ""
    //       ? localCustomer?.endereco ?? EmptyAddress
    //       : customer.endereco,
    //   whatsapp:
    //     customer.whatsapp === ""
    //       ? localCustomer?.whatsapp ?? ""
    //       : customer.whatsapp,
    // };
    const newLocalCustomer: ICliente = customer;

    localStorage.setItem("customer", JSON.stringify(newLocalCustomer));
    localStorage.setItem(
      "lastExclusion",
      format(new Date(), "yyyy-MM-dd hh:mm:ss")
    );

    saveMyOrderLocalAndState({
      ...myOrder,
      cliente: customer,
      tipo: type,
      taxaEntrega: fee,
    });
  };

  const setFee = (fee: number) => {
    console.log("taxa", fee);
    saveMyOrderLocalAndState({
      ...myOrder,
      taxaEntrega: fee,
    });
  };

  const newOrder = () => {
    saveMyOrderLocalAndState({
      ...EmptyOrder,
    });
  };

  const removeAllPayments = () => {
    saveMyOrderLocalAndState({ ...myOrder, pagamentos: [] });
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
        setId,
        setFee,
        newOrder,
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
