import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { IItem } from "../types/item";

import {
  IEnderecoCliente,
  ICLiente,
  IPedido,
  IPagamento,
} from "../types/order";

const MyOrderContext = createContext<{
  myOrder: IPedido;
  setMyOrder: (newOrder: IPedido) => void; // Dispatch<SetStateAction<IOrder | null>>;
  addItem: (item: IItem | IItem[]) => void;
  addPayment: (payment: IPagamento | IPagamento[]) => void;
  removeItem: (itemId: string) => void;
  removePayment: (PaymentId: string) => void;
  removeAllPayments: () => void;
  setInfo: (
    customer: ICLiente,
    type: "retirada" | "entrega" | null,
    fee: number
  ) => void;
  setFee: (fee: number) => void;
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
    saveMyOrderLocalAndState({
      ...myOrder,
      itens: myOrder.itens.filter((i) => i.id !== itemId),
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
    customer: ICLiente,
    type: "retirada" | "entrega" | null,
    fee: number
  ) => {
    const localCustomer =
      (JSON.parse(localStorage.getItem("customer")) as ICLiente) ?? null;
    const newLocalCustomer: ICLiente = {
      nome: customer.nome === "" ? localCustomer?.nome ?? "" : customer.nome,
      endereco:
        customer.endereco.rua === ""
          ? localCustomer?.endereco ?? EmptyAddress
          : customer.endereco,
      whatsapp:
        customer.whatsapp === ""
          ? localCustomer?.whatsapp ?? ""
          : customer.whatsapp,
    };

    localStorage.setItem("customer", JSON.stringify(newLocalCustomer));

    saveMyOrderLocalAndState({
      ...myOrder,
      cliente: customer,
      tipo: type,
      taxaEntrega: fee,
    });
  };

  const setFee = (fee: number) => {
    saveMyOrderLocalAndState({
      ...myOrder,
      taxaEntrega: fee,
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
