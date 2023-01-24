import Image from "next/image";
import { PaymentMethodStyle } from "./styles";

export const PaymentMethod = ({
  type,
  click,
  selected,
}: {
  type: "cash" | "card" | "pix";
  selected: boolean;
  click: (type: "cash" | "card" | "pix") => void;
}) => {
  // {
  //   backgroundColor:
  //     type === "card" ? "#FFBE18" : type === "cash" ? "#2AD000" : "#00B2FF",
  // }
  return (
    <PaymentMethodStyle
      className={`${selected ? "selected" : undefined}`}
      onClick={() => click(type)}
    >
      {type === "card" ? (
        <Image
          src={"/images/pay-card.svg"}
          layout={"fill"}
          alt="PAGAMENTO NO CARTÃO"
        />
      ) : type === "cash" ? (
        <Image
          src={"/images/pay-cash.svg"}
          layout={"fill"}
          alt="PAGAMENTO EM ESPÉCIE"
        />
      ) : (
        <Image
          src={"/images/pay-pix.svg"}
          layout={"fill"}
          alt="PAGAMENTO VIA PIX"
        />
      )}
    </PaymentMethodStyle>
  );
};
