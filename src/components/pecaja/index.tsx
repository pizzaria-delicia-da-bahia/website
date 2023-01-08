import type { FC } from "react";
import { PecaJaButtonStyle } from "./styles";
import { MdDeliveryDining } from "react-icons/md";

export const PecaJaButton: FC<{ style: "minimal" | "large" }> = ({ style }) => {
  return (
    <a
      href={encodeURI(
        "https://api.whatsapp.com/send?phone=+5571988726927&text=Olá, gostaria de fazer um pedido! 🍕"
      )}
      style={{ textDecoration: "none" }}
      target="_blank"
      aria-label="Clique aqui para realizar um pedido"
    >
      <PecaJaButtonStyle className={`peca-ja-button ${style}`}>
        <span className="title">PEÇA JÁ</span>
        {style === "large" && <MdDeliveryDining className="icon" />}
      </PecaJaButtonStyle>
    </a>
  );
};
