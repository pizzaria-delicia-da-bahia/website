import Modal from "@components/modal";
import { colors } from "@styles/colors";
import { Button, ButtonPrimary } from "@styles/components/buttons";
import { useState } from "react";
import { usePagamentoPage } from "./Context";
import { usePayment } from "@context/paymentContext";
import { BankNote } from "./BankNote";

export const Change = () => {
  // const [precisaTroco, setPrecisaTroco] = useState<boolean | undefined>(
  //   undefined
  // );
  // const [trocoPara, setTrocoPara] = useState<number | "">("");
  // const { setModal_change, pagamentoAtual, setPagamentoAtual, addPagamento } =
  //   usePagamentoPage();
  // const {} = usePayment();

  // const blockAddPagamento =
  //   !trocoPara ||
  //   isNaN(Number(trocoPara)) ||
  //   Number(trocoPara) < pagamentoAtual.valor;

  // const _addPagamento = () => {
  //   if (!blockAddPagamento) {
  //     setPagamentoAtual((prev) => ({
  //       ...prev,
  //       trocoPara: trocoPara ?? pagamentoAtual.valor,
  //     }));
  //     addPagamento({ ...pagamentoAtual, trocoPara });
  //     setModal_change(false);
  //   }
  // };

  // return (
  //   <Modal
  //     className="change-modal"
  //     label={
  //       precisaTroco === undefined
  //         ? "Você vai precisar de troco?"
  //         : precisaTroco === true
  //         ? "Troco pra quanto?"
  //         : ""
  //     }
  //     type={"custom"}
  //     buttons={
  //       precisaTroco === true ? (
  //         <>
  //           <ButtonPrimary disabled={blockAddPagamento} onClick={_addPagamento}>
  //             Pronto!
  //           </ButtonPrimary>
  //         </>
  //       ) : (
  //         <></>
  //       )
  //     }
  //   >
  //     <div style={{ display: "flex" }}>
  //       {precisaTroco === undefined ? (
  //         <>
  //           <Button
  //             bgcolor={colors.elements}
  //             forecolor={colors.background}
  //             onClick={_addPagamento}
  //           >
  //             O dinheiro está trocado!
  //           </Button>

  //           <Button
  //             bgcolor={colors.elements}
  //             forecolor={colors.background}
  //             onClick={() => setPrecisaTroco(true)}
  //           >
  //             Preciso de troco para...
  //           </Button>
  //         </>
  //       ) : precisaTroco === true ? (
  //         <>
  //           <input
  //             type="number"
  //             autoFocus
  //             placeholder="Ex: R$ 50,00"
  //             step={0.5}
  //             value={trocoPara}
  //             onChange={(e) => setTrocoPara(Number(e.target.value))}
  //             onKeyUp={(e) => {
  //               if (e.key === "Enter") {
  //                 e.preventDefault();
  //                 _addPagamento();
  //               }
  //             }}
  //           />

  //           <div className="changes-wrapper">
  //             {[5, 10, 20, 50, 100, 200]
  //               .filter((x) => x >= pagamentoAtual.valor)
  //               .map((x) => (
  //                 <BankNote key={x} value={x} />
  //               ))}
  //           </div>
  //         </>
  //       ) : (
  //         <></>
  //       )}
  //     </div>
  //   </Modal>
  // );

  return <></>;
};
