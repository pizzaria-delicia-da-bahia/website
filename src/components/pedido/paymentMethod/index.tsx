import Image from "next/image";
import { PaymentMethodStyle } from "./styles";

export const PaymentMethod = ({
  type,
  click,
  selected,
}: {
  type: "especie" | "cartao" | "pix";
  selected: boolean;
  click: (type: "especie" | "cartao" | "pix") => void;
}) => {
  // {
  //   backgroundColor:
  //     type === "cartao" ? "#FFBE18" : type === "especie" ? "#2AD000" : "#00B2FF",
  // }
  return (
    <PaymentMethodStyle
      className={`${selected ? "selected" : undefined}`}
      onClick={() => click(type)}
    >
      {type === "cartao" ? (
        <Image
          src={"/images/pay-card.svg"}
          layout={"fill"}
          alt="PAGAMENTO NO CARTÃO"
        />
      ) : type === "especie" ? (
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
