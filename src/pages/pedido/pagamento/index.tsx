import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useMyOrder } from "../../../context/myOrderContext";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../../styles/components/buttons";
import { formatCurrency } from "../../../utitl/functions/format";
import { useRouter } from "next/router";
import { PagamentoStyle } from "../../../styles/pages/pedido/pagamento/styles";
import { v4 as uuidv4 } from "uuid";
import { PaymentMethod } from "../../../components/pedido/paymentMethod";
import { ButtonBankNote } from "../../../components/pedido/bankNoteButton";
import { sleep } from "../../../utitl/functions/misc";

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
      (myOrder.itens?.length ?? []) < 1 ||
      (myOrder.cliente?.nome ?? "") === "" ||
      (myOrder.cliente?.whatsapp ?? "") === "" ||
      (myOrder.tipo === "entrega" && (myOrder.cliente?.endereco ?? "") === "")
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

  const next = (e) => {
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
      <div className="text">
        <h1 className="title">PAGAMENTO</h1>
        <p className="value">
          VALOR TOTAL <b>{formatCurrency(data.valor)}</b>
          {myOrder.tipo === "entrega" && myOrder.taxaEntrega > 0 ? (
            <span>{` (ITENS + ENTREGA)`}</span>
          ) : (
            <span>{` (ENDEREÇO NÃO ENCONTRADO, FALTA INCLUIR TAXA DE ENTREGA)`}</span>
          )}
        </p>
      </div>
      <div className="menu">
        <div className="inputs-changes-methods">
          <div className="methods">
            <span className="input-label">SELECIONE UM MÉTODO:</span>
            <ul>
              {["especie", "cartao", "pix"].map((x) => (
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
      <nav className="bottom-controls">
        <ButtonSecondary onClick={() => router.back()}>VOLTAR</ButtonSecondary>
        <ButtonPrimary
          disabled={nextInactive || !data || !data.tipo}
          onClick={next}
        >
          CONTINUAR
        </ButtonPrimary>
      </nav>
    </PagamentoStyle>
  );
};

export default Pagamento;
