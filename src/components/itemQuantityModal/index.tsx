import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ButtonPrimary, ButtonSecondary } from "@styles/components/buttons";
import { IOutro } from "@models/outro";
import { ItemQuantityModalStyle } from "./styles";
import TextContainer from "@components/textContainer";
import BottomControls from "@components/pedido/bottomControls";

const ItemQuantityModal: FC<{
  item: IOutro;
  showModal: boolean;
  confirm: () => void;
  cancel: () => void;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}> = ({ item, showModal, confirm, cancel, value, setValue }) => {
  if (!showModal) return <></>;
  return (
    <ItemQuantityModalStyle>
      <TextContainer
        title="QUANTIDADE"
        description={`SELECIONE A QUANTIDADE DE ${item.nome.toUpperCase()}`}
      />

      <div className="menu">
        <input
          type="number"
          min={1}
          max={15}
          value={value || ""}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>

      <BottomControls
        notFixed
        secondaryButton={{ click: cancel }}
        primaryButton={{
          click: confirm,
          disabled: value < 1 || value > 15,
          text: "ADICIONAR",
        }}
      />
    </ItemQuantityModalStyle>
  );
};
export default ItemQuantityModal;
