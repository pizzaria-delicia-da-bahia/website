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
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../styles/components/buttons";
import { IOutro } from "../../types/outro";
import { ItemQuantityModalStyle } from "./styles";

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
      <div className="text">
        <h1 className="title">QUANTIDADE</h1>
        <h1 className="subtitle">
          SELECIONE A QUANTIDADE DE
          <br />
          <b>{item.nome.toUpperCase()}</b>
        </h1>
      </div>
      <div className="menu">
        <input
          type="number"
          min={1}
          max={15}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
      <div className="bottom-controls">
        <ButtonSecondary onClick={cancel}>VOLTAR</ButtonSecondary>
        <ButtonPrimary disabled={value < 1 || value > 15} onClick={confirm}>
          ADICIONAR
        </ButtonPrimary>
      </div>
    </ItemQuantityModalStyle>
  );
};
export default ItemQuantityModal;
