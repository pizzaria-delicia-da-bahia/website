import { MouseEventHandler } from "react";
import { FlagEmojiToPNG } from "../../../utitl/functions/conversion";
import { SaborStyle } from "./styles";

export const Sabor = ({
  nome,
  ingredientes,
  valuesString,
  showCheckBox = false,
  active,
  checked,
  setChecked,
}: {
  nome: string;
  ingredientes: string[];
  valuesString: string;
  showCheckBox?: boolean;
  active: boolean;
  checked?: boolean;
  setChecked?: (boolean) => void;
}) => (
  <SaborStyle
    style={!active ? { opacity: 0.4, pointerEvents: "none" } : {}}
    showCheckBox={showCheckBox}
    className={`${!active ? "disabled" : undefined}`}
    onClick={(e) => e.target === e.currentTarget && setChecked(!checked)}
  >
    {showCheckBox && (
      <div className="left">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(!checked)}
          />
          <span />
        </label>
      </div>
    )}
    <div className="right">
      <span className="flavour-name">
        <h5>{`${nome.split(" ").slice(0, -1).join(" ")}`}</h5>
        <h5>{FlagEmojiToPNG(nome.split(" ").pop())}</h5>
      </span>
      <p className="flavour-ingredients">{ingredientes.join(", ")}</p>
      <p className="flavour-values">{valuesString}</p>
    </div>
  </SaborStyle>
);
