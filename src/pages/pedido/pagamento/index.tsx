import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useMyOrder } from "@context/myOrderContext";
import { ButtonPrimary, ButtonSecondary } from "@styles/components/buttons";
import { formatCurrency } from "@util/format";
import { useRouter } from "next/router";
import { PagamentoStyle } from "@styles/pages/pedido/pagamento/styles";
import { v4 as uuidv4 } from "uuid";
import { PaymentMethod } from "@components/pedido/paymentMethod";
import { ButtonBankNote } from "@components/pedido/bankNoteButton";
import { sleep } from "@util/misc";
import TextContainer from "@components/textContainer";
import BottomControls from "@components/pedido/bottomControls";

const Pagamento: NextPage = () => {
  const { myOrder, addPayment, removeAllPayments } = useMyOrder();
  const router = useRouter();
  const [nextInactive, setNextInactive] = useState<boolean>(false);
  const [data, setData] = useState<{
    valor: number;
    trocoPara: number;
    tipo: "especie" | "cartao" | "pix";
  }>({
    valor:
      myOrder && myOrder.itens?.length
        ? myOrder.itens.reduce((acc, item) => acc + item.valor, 0) +
          myOrder.taxaEntrega
        : 0,
    trocoPara: 0,
    tipo: null,
  });

  useEffect(() => {
    if (
      !myOrder ||
      (myOrder?.itens?.length ?? []) < 1 ||
      (myOrder?.cliente?.nome ?? "") === "" ||
      (myOrder?.cliente?.whatsapp ?? "") === "" ||
      (myOrder?.tipo === "entrega" && (myOrder.cliente?.endereco ?? "") === "")
    ) {
      router.push("/pedido");
    } else {
      // setFee(fee);
      removeAllPayments();
    }
  }, []);

  const setSelectedBankNote = (value: number) => {
    setData((prev) => ({
      ...prev,
      trocoPara: prev.trocoPara === value ? 0 : value,
    }));
  };
  const setSelectedPaymentMethod = (value: "especie" | "cartao" | "pix") => {
    setData((prev) => ({ ...prev, tipo: prev.tipo === value ? null : value }));
  };

  const MakeButtonBankNote = ({ value }: { value: number }) => {
    return (
      <ButtonBankNote
        value={value}
        disabled={data.tipo !== "especie" || data.valor >= value}
        selected={data.tipo === "especie" && data.trocoPara === value}
        click={setSelectedBankNote}
      />
    );
  };
  const MakePaymentMethod = ({
    type,
  }: {
    type: "especie" | "cartao" | "pix";
  }) => (
    <PaymentMethod
      type={type}
      selected={data.tipo === type}
      click={setSelectedPaymentMethod}
    />
  );

  const next = () => {
    setNextInactive(true);
    addPayment({ id: uuidv4(), ...data });
    router.push(
      `/pedido/confirmacao${
        myOrder.tipo === "entrega"
          ? `/${myOrder.cliente.endereco.bairroId}`
          : ""
      }`
    );
  };

  return (
    <PagamentoStyle>
      <TextContainer
        title="PAGAMENTO"
        subtitle={`VALOR TOTAL ${formatCurrency(data.valor)}`}
        description={
          myOrder?.tipo === "entrega"
            ? myOrder?.taxaEntrega > 0
              ? ` (ITENS + ENTREGA)`
              : ` (ENDEREÇO NÃO ENCONTRADO, FALTA INCLUIR TAXA DE ENTREGA)`
            : undefined
        }
      />

      <div className="menu">
        <div className="inputs-changes-methods">
          <div className="methods">
            <span className="input-label">SELECIONE UM MÉTODO:</span>
            <ul>
              {myOrder.itens.some((x) => x.observacao.includes("DIA DAS MÃES"))
                ? ["especie", "pix"]
                : ["especie", "cartao", "pix"].map((x) => (
                    <MakePaymentMethod
                      key={x}
                      type={x as "especie" | "cartao" | "pix"}
                    />
                  ))}
            </ul>
          </div>

          <div className="changes">
            <span className="input-label">TROCO PARA:</span>
            <div className="changes-wrapper">
              {[5, 10, 20, 50, 100, 200].map((x) => (
                <MakeButtonBankNote key={x} value={x} />
              ))}
            </div>
            <span className="input-label no-change-container">
              <input
                type={"checkbox"}
                id="no-change"
                checked={data.trocoPara === 0}
                disabled={data.tipo !== "especie"}
                onChange={() => setSelectedBankNote(0)}
              />
              <label htmlFor="no-change">Não vou precisar de troco</label>
            </span>
          </div>
        </div>
      </div>
      <BottomControls
        backButton
        primaryButton={{
          click: next,
          disabled: nextInactive || !data || !data.tipo,
        }}
      />
    </PagamentoStyle>
  );
};

export default Pagamento;
