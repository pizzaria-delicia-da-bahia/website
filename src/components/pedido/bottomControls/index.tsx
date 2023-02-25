import { Badge } from "@components/badge";
import { ButtonPrimary, ButtonSecondary } from "@styles/components/buttons";
import { useRouter } from "next/router";
import type { FC } from "react";
import { BottomControlsStyle } from "./styles";

interface BottomControlsProps {
  backButton?: boolean;
  fixed?: boolean;
  secondaryButton?: {
    click: () => void;
    disabled?: boolean;
    text?: string;
    badge?: number;
  };
  primaryButton?: {
    click: () => void;
    disabled?: boolean;
    text?: string;
    badge?: number;
  };
}

const BottomControls: FC<BottomControlsProps> = ({
  primaryButton,
  secondaryButton,
  backButton,
  fixed = true,
}) => {
  const router = useRouter();
  return (
    <BottomControlsStyle fixed={fixed}>
      {backButton && (
        <ButtonSecondary onClick={router.back}>VOLTAR</ButtonSecondary>
      )}
      {!backButton && secondaryButton && (
        <ButtonSecondary
          disabled={!!secondaryButton.disabled}
          onClick={secondaryButton.click}
        >
          {secondaryButton.text || "VOLTAR"}
          {secondaryButton.badge && <Badge number={secondaryButton.badge} />}
        </ButtonSecondary>
      )}
      {primaryButton && (
        <ButtonPrimary
          disabled={!!primaryButton.disabled}
          onClick={primaryButton.click}
        >
          {primaryButton.text || "CONTINUAR"}
          {primaryButton.badge && <Badge number={primaryButton.badge} />}
        </ButtonPrimary>
      )}
    </BottomControlsStyle>
  );
};
export default BottomControls;
