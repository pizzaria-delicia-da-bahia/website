import BottomControls from "@components/pedido/bottomControls";
import Text from "@components/text";
import { ButtonPrimary, ButtonSecondary } from "@styles/components/buttons";
import type { FC } from "react";
import { ModalStyle } from "./styles";

interface IModal {
  type: "true-false";
  label: string;
  onTrue?: () => void;
  onFalse?: () => void;
}

const Modal: FC<IModal> = ({ label, type, onTrue, onFalse }) => {
  return (
    <ModalStyle>
      <main>
        <header>
          <Text type="title">{label}</Text>
        </header>

        <footer>
          {type === "true-false" ? (
            <>
              <BottomControls
                secondaryButton={{
                  click: () => onFalse?.(),
                  text: "Não",
                }}
                primaryButton={{
                  click: () => onTrue?.(),
                  text: "Adicionar!",
                }}
              />
            </>
          ) : (
            <></>
          )}
        </footer>
      </main>
    </ModalStyle>
  );
};
export default Modal;
