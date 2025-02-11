import Modal from "@components/modal";
import { usePayment } from "@context/paymentContext";
import { ButtonPrimary, ButtonSecondary } from "@styles/components/buttons";
import { formatCurrency } from "@util/format";
import { usePagamentoPage } from "./Context";
import { useLayoutEffect } from "react";
import { calcularTaxaMaquininha } from "@util/math";

export const MachineTax = () => {
  const { taxaMaquininha, valorItensTaxados, totalPedido, itensTaxados } =
    usePayment();
  const {
    setModal_tax,
    setModal_value,
    pagamentoAtual,
    setPagamentoAtual,
    valorPago,
    valorPagoOutros,
  } = usePagamentoPage();

  const continuar = () => {
    setModal_tax(false);
    setModal_value(true);
  };

  useLayoutEffect(() => {
    const _taxaProporcional =
      pagamentoAtual.tipo === "cartao" && itensTaxados?.length
        ? calcularTaxaMaquininha(
            valorItensTaxados,
            totalPedido - valorPago,
            taxaMaquininha,
            valorPagoOutros
          )
        : 0;

    if (_taxaProporcional === 0) {
      continuar();
    }
  }, []);
  return (
    <Modal
      className="machine-tax-modal"
      label={`${
        pagamentoAtual.tipo === "cartao"
          ? "Taxa da maquininha"
          : "Taxa de processamento"
      }`}
      description={`Esse método de pagamento tem uma taxa de ${taxaMaquininha}%`}
      subdescription="Deseja continuar?"
      type={"custom"}
      buttons={
        <>
          <ButtonPrimary
            onClick={() => {
              setPagamentoAtual(undefined);
              setModal_tax(false);
            }}
          >
            Voltar
          </ButtonPrimary>
          <ButtonSecondary onClick={continuar}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              Continuar
              <small style={{ color: "white" }}>*com a taxa</small>
            </div>
          </ButtonSecondary>
        </>
      }
    >
      <small>
        Nossas promoções e combos exclusivas para pix ou dinheiro, podem também
        ser pagas no cartão (crédito ou débito). Porém é acrescentada a taxa da
        maquininha proporcional ao valor pago no cartão
      </small>
    </Modal>
  );
};
