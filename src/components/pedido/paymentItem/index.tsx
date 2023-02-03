import { FC } from "react";
import { IPagamento } from "../../../types/order";
import { formatCurrency } from "../../../utitl/functions/format";
import { PaymentItemStyle } from "./styles";

export const PaymentItem: FC<{ payment: IPagamento }> = ({ payment }) => {
  return (
    <PaymentItemStyle>
      <h5 className="title">{`${formatCurrency(payment.valor)} (${
        payment.tipo === "especie"
          ? "EM ESPÉCIE"
          : payment.tipo === "card"
          ? "NO CARTÃO"
          : "NO PIX"
      }${
        payment.tipo === "especie" && payment.trocoPara > 0
          ? " TROCO P/" + payment.trocoPara
          : ""
      }`}</h5>
      <button>x</button>
    </PaymentItemStyle>
  );
};
