import Modal from "@components/modal";
import { useEffect, useState } from "react";
import { usePagamentoPage } from "./Context";
import { formatCurrency } from "@util/format"; //formatTipoPagamento
import { usePayment } from "@context/paymentContext";
import { ButtonPrimary, ButtonSecondary } from "@styles/components/buttons";
import { calcularTaxaMaquininha } from "@util/math";

export const Value = () => {
  // const {
  //   setModal_value,
  //   setModal_change,
  //   setPagamentoAtual,
  //   pagamentoAtual,
  //   pagamentos,
  //   addPagamento,
  //   valorPago,
  //   valorPagoMenosTaxa,
  //   valorPagoCartao,
  //   valorPagoOutros,
  // } = usePagamentoPage();
  // const { totalPedido, itensTaxados, valorItensTaxados, taxaMaquininha } =
  //   usePayment();
  // // const [valor, setValor] = useState(
  // //   (
  // //     totalPedido +
  // //     (pagamentoAtual.tipo === "cartao" ? itensTaxados.length : 0) -
  // //     valorPago
  // //   ).toString()
  // // );

  // const [_valorOrig, setValorOrig] = useState(totalPedido - valorPagoMenosTaxa);
  // const [_valor, setValor] = useState(
  //   (() => {
  //     const _taxaProporcional =
  //       pagamentoAtual.tipo === "cartao" && itensTaxados?.length
  //         ? calcularTaxaMaquininha(
  //             valorItensTaxados,
  //             totalPedido - valorPagoMenosTaxa,
  //             taxaMaquininha,
  //             valorPagoOutros
  //           )
  //         : 0;

  //     console.log(
  //       "_taxaProporcional----",
  //       _taxaProporcional,
  //       valorPago,
  //       valorItensTaxados
  //     );
  //     return (totalPedido + _taxaProporcional - valorPagoMenosTaxa).toFixed(2);
  //   })()
  // );

  // const next = () => {
  //   try {
  //     const __valor = Number(_valor);

  //     if (
  //       !(
  //         !__valor ||
  //         isNaN(__valor) ||
  //         __valor <= 0 ||
  //         __valor > totalPedido - valorPagoMenosTaxa
  //       )
  //     ) {
  //       setPagamentoAtual((prev) => ({ ...prev, valor: __valor }));
  //       if (pagamentoAtual.tipo === "especie") {
  //         setModal_change(true);
  //       } else {
  //         setPagamentoAtual((prev) => ({
  //           ...prev,
  //           trocoPara: __valor,
  //         }));
  //         addPagamento({
  //           ...pagamentoAtual,
  //           valor: __valor,
  //           trocoPara: __valor,
  //         });
  //       }
  //       setModal_value(false);
  //     }
  //   } catch (err) {}
  // };

  // const voltar = () => {
  //   setModal_value(false);
  //   setPagamentoAtual(undefined);
  // };

  // const beforeUnload = function (e) {
  //   console.log("entroooooooooou");
  //   e && e.preventDefault();
  //   voltar();
  // };
  // useEffect(() => {
  //   window.addEventListener("beforeunload", beforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", beforeUnload);
  //   };
  // }, []);
  // const resize = () => {
  //   console.log("resizoooooooooou");

  //   document.body.style.height = `${window.visualViewport.height}px`;
  // };
  // useEffect(() => {
  //   window.visualViewport.addEventListener("resize", resize);
  //   return () => {
  //     window.visualViewport.removeEventListener("resize", resize);
  //   };
  // }, []);

  // const taxaProporcional =
  //   pagamentoAtual.tipo === "cartao" &&
  //   Number(_valorOrig) > 0 &&
  //   itensTaxados?.length
  //     ? calcularTaxaMaquininha(
  //         valorItensTaxados,
  //         Number(_valorOrig),
  //         taxaMaquininha,
  //         valorPagoOutros
  //       )
  //     : 0;

  // const ficaraFaltando =
  //   totalPedido > 0
  //     ? totalPedido + taxaProporcional - valorPago - Number(_valor)
  //     : 0;
  // return (
  //   <Modal
  //     className="change-modal"
  //     label={`Qual o valor?`}
  //     description={`Vai ser quanto ${formatTipoPagamento(
  //       pagamentoAtual.tipo
  //     )}?`}
  //     subdescription={
  //       valorPago
  //         ? `Faltam ${formatCurrency(
  //             totalPedido - valorPago
  //           )} no total de ${formatCurrency(totalPedido)}`
  //         : undefined
  //     }
  //     type={"custom"}
  //     buttons={
  //       <>
  //         <ButtonSecondary onClick={voltar}>Voltar</ButtonSecondary>
  //         <ButtonPrimary onClick={next}>Continuar</ButtonPrimary>
  //       </>
  //     }
  //   >
  //     <input
  //       type="number"
  //       step={0.5}
  //       value={_valor ?? ""}
  //       onKeyDown={(e) => {
  //         if (
  //           [
  //             ..."1234567890.,".split(""),
  //             "Backspace",
  //             "Enter",
  //             "ArrowUp",
  //             "ArrowDown",
  //             "ArrowLeft",
  //             "ArrowRight",
  //           ].every((x) => x !== e.key)
  //         )
  //           e.preventDefault();
  //       }}
  //       onChange={(e) => {
  //         const valor = Number(Number(e.target.value).toFixed(2));
  //         const falta = totalPedido + taxaProporcional - valorPago;
  //         if (valor > falta) {
  //           e.preventDefault();
  //         } else {
  //           setValor((valor || "").toString());
  //           // setValorOrig(valor||"" )
  //         }
  //       }}
  //       onKeyUp={(e) => {
  //         if (e.key === "Enter") {
  //           e.preventDefault();
  //           next();
  //         }
  //       }}
  //     />
  //     <div style={{ display: "flex", flexDirection: "column" }}>
  //       {taxaProporcional > 0 && (
  //         <small>
  //           Desse valor, você pagará {formatCurrency(taxaProporcional)}
  //           {"\n "}
  //           de taxa
  //         </small>
  //       )}
  //       {ficaraFaltando > 0 && (
  //         <small>Ficará faltando {formatCurrency(ficaraFaltando)}</small>
  //       )}
  //     </div>
  //   </Modal>
  // );

  return <></>;
};
