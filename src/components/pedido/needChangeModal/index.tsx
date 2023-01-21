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
import { NeedChangeModalStyle } from "./styles";

const NeedChangeModal: FC<{
  min: number;
  cancel: (changeFor: number) => void;
  confirm: () => void;
}> = ({ confirm, cancel, min }) => {
  return (
    <NeedChangeModalStyle>
      {/* <div className="text">
        <h1 className="title">TROCO</h1>
        <h1 className="subtitle">
          VAI PRECISAR DE TROCO?
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
      </div> */}
    </NeedChangeModalStyle>
  );
};
export default NeedChangeModal;
