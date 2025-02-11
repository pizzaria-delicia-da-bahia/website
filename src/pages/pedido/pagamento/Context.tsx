import { SetState } from "@config/react";
import { useMyOrder } from "@context/myOrderContext";
import { usePayment } from "@context/paymentContext";
import { IPagamento } from "@models/order";
import { formatCurrency } from "@util/format"; //formatTipoPagamento
import { calcularTaxaMaquininha, subtrairTaxaMaquininha } from "@util/math";
import { sleep } from "@util/misc";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

interface IPagSemId extends Omit<IPagamento, "id"> {}

interface IPagamentoPageContext {
  // pagamentos: IPagamento[];
  // setPagamentos: SetState<IPagamento[]>;
  // pagamentoAtual: IPagSemId | undefined;
  // setPagamentoAtual: SetState<IPagSemId | undefined>;
  // addPagamento: (pagamento?: IPagSemId) => void;
  // modal_change: boolean;
  // setModal_change: SetState<boolean>;
  // modal_tax: boolean;
  // setModal_tax: SetState<boolean>;
  // modal_value: boolean;
  // setModal_value: SetState<boolean>;
  // continuar: () => void;
  // valorPago: number;
  // valorPagoMenosTaxa: number;
  // valorPagoCartao: number;
  // valorPagoOutros: number;
}
const PagamentoPageContext = createContext<IPagamentoPageContext>(
  {} as IPagamentoPageContext
);

export const PagamentoPageProvider = ({ children }) => {
  // const [pagamentos, setPagamentos] = useState<IPagamento[]>([]);
  // const [pagamentoAtual, setPagamentoAtual] = useState<IPagSemId | undefined>();

  // const [modal_change, setModal_change] = useState(false);
  // const [modal_tax, setModal_tax] = useState(false);
  // const [modal_value, setModal_value] = useState(false);
  // const { myOrder, addPaymentToOrder } = useMyOrder();
  // const { totalPedido, valorItensTaxados, taxaMaquininha } = usePayment();

  // const addPagamento = (pagamento?: IPagSemId) => {
  //   const _pag =
  //     pagamento.tipo && pagamento.valor
  //       ? pagamento
  //       : pagamentoAtual.tipo && pagamentoAtual.valor
  //       ? pagamentoAtual
  //       : undefined;
  //   if (_pag.tipo && _pag.valor) {
  //     setPagamentos((prev) => [
  //       ...prev,
  //       { ...pagamentoAtual, ...(pagamento ?? {}), id: uuidv4() },
  //     ]);

  //     (async () => {
  //       if (totalPedido - (valorPago + _pag.valor)) {
  //         toast.success(
  //           `${formatCurrency(_pag.valor)} ${formatTipoPagamento(
  //             _pag.tipo
  //           )} adicionados ao pagamento!`
  //         );
  //         await sleep(2000);
  //         toast.success(
  //           `Adicione o restante (${formatCurrency(
  //             totalPedido - (valorPago + _pag.valor)
  //           )}) para continuar`
  //         );
  //       }
  //     })();
  //   }
  // };

  // const somar = (lista: { valor: number }[]) =>
  //   lista.reduce((acc, curr) => acc + curr.valor, 0);
  // const valorPagoCartao = somar(pagamentos.filter((x) => x.tipo === "cartao"));
  // const valorPagoOutros = somar(pagamentos.filter((x) => x.tipo !== "cartao"));
  // const valorPago = somar(pagamentos);

  // const valorPagoMenosTaxa =
  //   somar(pagamentos) -
  //   (valorItensTaxados > 0
  //     ? calcularTaxaMaquininha(
  //         valorItensTaxados,
  //         totalPedido -
  //           (subtrairTaxaMaquininha(valorPagoCartao, taxaMaquininha) +
  //             valorPagoOutros),
  //         taxaMaquininha,
  //         valorPagoOutros
  //       )
  //     : 0);

  // const router = useRouter();

  // const continuar = () => {
  //   router.push(
  //     `/pedido/confirmacao${
  //       myOrder.tipo === "entrega"
  //         ? `/${myOrder.cliente.endereco.bairroId}`
  //         : ""
  //     }`
  //   );
  // };

  // useEffect(() => {
  //   if (
  //     valorPago ===
  //     totalPedido +
  //       calcularTaxaMaquininha(
  //         valorItensTaxados,
  //         valorPagoCartao,
  //         taxaMaquininha,
  //         valorPagoOutros
  //       )
  //   ) {
  //     addPaymentToOrder(pagamentos);
  //     continuar();
  //   }
  // }, [valorPago]);

  return (
    <PagamentoPageContext.Provider
      value={
        {
          // pagamentos,
          // setPagamentos,
          // pagamentoAtual,
          // setPagamentoAtual,
          // addPagamento,
          // modal_change,
          // setModal_change,
          // modal_tax,
          // setModal_tax,
          // modal_value,
          // setModal_value,
          // continuar,
          // valorPago,
          // valorPagoMenosTaxa,
          // valorPagoCartao,
          // valorPagoOutros,
        }
      }
    >
      {children}
    </PagamentoPageContext.Provider>
  );
};

export const usePagamentoPage = () => {
  return useContext(PagamentoPageContext);
};
