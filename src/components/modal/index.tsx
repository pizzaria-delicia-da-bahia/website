import BottomControls from "@components/pedido/bottomControls";
import Text from "@components/text";
import type { FC, ReactNode } from "react";
import { ModalStyle } from "./styles";

interface IModal {
  type: "true-false" | "custom";
  label: string;
  description?: string;
  onTrue?: () => void;
  onFalse?: () => void;
  children?: ReactNode | ReactNode[];
  buttons?: ReactNode | ReactNode[];
  className?: string;
}

const Modal: FC<IModal> = ({
  label,
  description,
  type,
  onTrue,
  onFalse,
  children,
  buttons,
  className,
}) => {
  return (
    <ModalStyle className={className}>
      <main>
        <header>
          <Text type="title">{label}</Text>
          {!!description && <Text type="subtitle">{description}</Text>}
        </header>
        {children}
        <footer style={{ display: "flex", justifyContent: "center" }}>
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
          ) : type === "custom" ? (
            buttons
          ) : (
            <></>
          )}
        </footer>
      </main>
    </ModalStyle>
  );
};
export default Modal;
