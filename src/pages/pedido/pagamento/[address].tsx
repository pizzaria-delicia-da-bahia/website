import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { useMyOrder } from "../../../context/myOrderContext";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../../styles/components/buttons";
import { formatCurrency } from "../../../utitl/functions/format";
import { useRouter } from "next/router";
import { EOrderType } from "../../../types/order";
import { PagamentoStyle } from "../../../styles/pages/pedido/pagamento/styles";
import { v4 as uuidv4 } from "uuid";
import { PaymentMethod } from "../../../components/pedido/paymentMethod";
import { ButtonBankNote } from "../../../components/pedido/bankNoteButton";
import { sleep } from "../../../utitl/functions/misc";

const Pagamento: NextPage = ({ fee }: { fee: number }) => {
  const { myOrder, setFee, addPayment, removeAllPayments } = useMyOrder();
  const router = useRouter();
  const [data, setData] = useState<{
    value: number;
    changeFor: number;
    type: "cash" | "card" | "pix";
  }>({
    value:
      myOrder && myOrder.items?.length
        ? myOrder.items.reduce((acc, item) => acc + item.valor, 0) + fee
        : 0,
    changeFor: 0,
    type: null,
  });

  useEffect(() => {
    if (
      !myOrder ||
      (myOrder.items?.length ?? []) < 1 ||
      (myOrder.customer?.name ?? "") === "" ||
      (myOrder.customer?.whatsapp ?? "") === "" ||
      (myOrder.type === EOrderType.delivery &&
        (myOrder.customer?.address ?? "") === "")
    ) {
      router.push("/pedido");
    } else {
      setFee(fee);
      removeAllPayments();
    }
  }, []);

  const setSelectedBankNote = (value: number) => {
    setData((prev) => ({
      ...prev,
      changeFor: prev.changeFor === value ? 0 : value,
    }));
  };
  const setSelectedPaymentMethod = (value: "cash" | "card" | "pix") => {
    setData((prev) => ({ ...prev, type: prev.type === value ? null : value }));
  };

  const MakeButtonBankNote = ({ value }: { value: number }) => (
    <ButtonBankNote
      value={value}
      disabled={data.type !== "cash" || data.value >= value}
      selected={data.type === "cash" && data.changeFor === value}
      click={setSelectedBankNote}
    />
  );
  const MakePaymentMethod = ({ type }: { type: "cash" | "card" | "pix" }) => (
    <PaymentMethod
      type={type}
      selected={data.type === type}
      click={setSelectedPaymentMethod}
    />
  );

  return (
    <PagamentoStyle>
      <div className="text">
        <h1>PAGAMENTO</h1>
        <h4>
          VALOR TOTAL <b>{formatCurrency(data.value)}</b>
        </h4>
        {myOrder.type === EOrderType.delivery && (
          <p>
            {fee > 0 ? (
              <span>{`(ITENS + TAXA DE ENTREGA)`}</span>
            ) : (
              <span>{`(SEU ENDEREÇO NÃO FOI ENCONTRADO, FALTA INCLUIR A TAXA DE ENTREGA)`}</span>
            )}
          </p>
        )}
      </div>
      <div className="menu">
        <div className="inputs-changes-methods">
          <span className="input-label">SELECIONE UM MÉTODO:</span>
          <div className="methods">
            {["cash", "card", "pix"].map((x) => (
              <MakePaymentMethod key={x} type={x as "cash" | "card" | "pix"} />
            ))}
          </div>
          <div className="inputs">
            <div className="changes">
              <span className="input-label">TROCO PARA:</span>
              <div className="changes-wrapper">
                {[5, 10, 20, 50, 100, 200].map((x) => (
                  <MakeButtonBankNote key={x} value={x} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="controls">
        <ButtonSecondary onClick={() => router.back()}>VOLTAR</ButtonSecondary>
        <ButtonPrimary
          disabled={!data || !data.type}
          onClick={() => {
            addPayment({ id: uuidv4(), ...data });
            sleep();
            router.push("/pedido/confirmacao");
          }}
        >
          PRÓXIMO PASSO
        </ButtonPrimary>
      </nav>
    </PagamentoStyle>
  );
};

export default Pagamento;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { address } = ctx.query;

  if (address) {
    try {
      const url = `${process.env.API_URL}/taxa/?${address}`;
      const { taxa } = await (await fetch(url)).json();
      return {
        props: {
          fee: taxa,
        },
      };
    } catch (e) {
      return {
        props: { fee: 0 },
      };
    }
  } else {
    return {
      props: { fee: 0 },
    };
  }
};
