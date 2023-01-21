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
  return (
    <PaymentMethodStyle
      className={`${selected ? "selected" : undefined}`}
      onClick={() => click(type)}
      style={{
        backgroundColor:
          type === "card" ? "#FFBE18" : type === "cash" ? "#2AD000" : "#00B2FF",
      }}
    >
      {type === "card" ? (
        <>
          CARTÃO
          <br />
          💳
        </>
      ) : type === "cash" ? (
        <>
          ESPÉCIE
          <br />
          💵
        </>
      ) : (
        <>
          PIX
          <br />
          💠
        </>
      )}
    </PaymentMethodStyle>
  );
};
