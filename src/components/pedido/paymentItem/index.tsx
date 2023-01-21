import { FC } from "react";
import { IPayment } from "../../../types/order";
import { formatCurrency } from "../../../utitl/functions/format";
import { PaymentItemStyle } from "./styles";

export const PaymentItem: FC<{ payment: IPayment }> = ({ payment }) => {
  return (
    <PaymentItemStyle>
      <h5 className="title">{`${formatCurrency(payment.value)} (${
        payment.type === "cash"
          ? "EM ESPÉCIE"
          : payment.type === "card"
          ? "NO CARTÃO"
          : "NO PIX"
      }${
        payment.type === "cash" && payment.changeFor > 0
          ? " TROCO P/" + payment.changeFor
          : ""
      }`}</h5>
      <button>x</button>
    </PaymentItemStyle>
  );
};
