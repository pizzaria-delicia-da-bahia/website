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
import { usePromo } from "./promoContext";
import { useMyOrder } from "./myOrderContext";
import { IItem } from "@models/item";
import { IPagamento } from "@models/order";
const taxaMaquininha = 5;

const PaymentContext = createContext<{
  itensTaxados: IItem[];
  taxaMaquininha: number;
  totalTaxa: number;
  totalPedido: number;
  valorItensTaxados: number;
}>(null);

const PaymentProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // const [payments, setPayments] = useState<Payment[]>([]);
  // const [paymentsCarregadas, setPaymentsCarregadas] = useState(false);

  const [itensTaxados, setItensTaxados] = useState<IItem[]>([]);
  const valorItensTaxados =
    itensTaxados?.length > 0
      ? itensTaxados.reduce((acc, curr) => acc + curr.valor, 0)
      : 0;

  const { promos } = usePromo();
  const { myOrder } = useMyOrder();

  const getValores = (itens: IItem[]) =>
    itens.reduce((acc, curr) => acc + curr.valor, 0);

  const getValorTaxaRestante = (pagamentos: IPagamento[]) => {};
  const totalTaxa = itensTaxados.length
    ? getValores(itensTaxados) -
      getValores(
        (myOrder.itens ?? []).filter((x) =>
          itensTaxados.some((y) => y.id === x.id)
        )
      )
    : 0;

  useEffect(() => {
    setItensTaxados([]);
    const _itensTaxados: IItem[] = [];
    (myOrder?.itens ?? []).forEach((item) => {
      if (item.promoId) {
        const itemPromo = promos.find((x) => x.id === item.promoId);
        if (itemPromo?.taxaMaquininha) {
          _itensTaxados.push({
            ...item,
            valorComTaxa: Math.ceil(item.valor * (1 + taxaMaquininha / 100)),
          });
        }
      }
    });
    setItensTaxados(_itensTaxados);
  }, [myOrder?.itens]);

  const { getTaxaGratis, getTaxaGratis36 } = usePromo();

  const totalPedido =
    myOrder && myOrder.itens?.length
      ? myOrder.itens.reduce((acc, item) => acc + item.valor, 0) +
        (getTaxaGratis(myOrder.itens) || getTaxaGratis36(myOrder.itens)
          ? 0
          : myOrder.taxaEntrega)
      : 0;
  return (
    <PaymentContext.Provider
      value={{
        itensTaxados,
        taxaMaquininha,
        totalTaxa,
        totalPedido,
        valorItensTaxados,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
export default PaymentProvider;

export const usePayment = () => {
  return useContext(PaymentContext);
};
