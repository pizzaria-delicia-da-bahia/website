import { FC, useState } from "react";
import { ISabor, IValor } from "../../../types/item";
import { FlavourStyle } from "./styles";

export const Flavour: FC<{
  sabor: ISabor;
  api_url: string;
  grupos?: Array<string>;
}> = ({ api_url, sabor, grupos }) => {
  const [myValue, setMyValue] = useState<ISabor>(sabor);
  const [myGroup, setMyGroup] = useState<string | null>(null);

  const saveFlavour = async (flavour: ISabor) => {
    console.log(JSON.stringify(flavour));
    const response = await fetch(`${api_url}/pizzas/sabores`, {
      method: sabor.nome.length > 0 ? "PATCH" : "POST",
      body: JSON.stringify(
        sabor.nome.length > 0 ? flavour : { grupo: "", sabor: flavour }
      ),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Sabor alterado ✅");
    }
  };

  return (
    <FlavourStyle>
      <div className="name">
        {sabor.nome.length > 0 ? (
          <label>{myValue.nome}</label>
        ) : (
          <>
            <input
              type="text"
              placeholder="Nome do sabor"
              value={myValue.nome}
              onChange={(e) =>
                setMyValue((prev) => ({ ...prev, nome: e.target.value }))
              }
            />
            <input
              type="text"
              id="my-select-input"
              placeholder="Grupo"
              value={myGroup}
              onChange={(e) => setMyGroup(e.target.value)}
              list="my-select-list"
            />
            <datalist id="my-select-list">
              {grupos.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </datalist>
          </>
        )}
        <input
          type="checkbox"
          checked={myValue.disponivel}
          onChange={(e) =>
            setMyValue((prev) => ({ ...prev, disponivel: e.target.checked }))
          }
        />
        <input
          className="ingredientes"
          type="text"
          placeholder="Calabresa, Cebola, Cheddar"
          value={myValue.ingredientes.join(", ")}
          onChange={(e) =>
            setMyValue((prev) => ({
              ...prev,
              ingredientes: String(e.target.value)
                .replace(", ", ",")
                .split(","),
            }))
          }
        />
      </div>
      <ul className="flavour-values">
        {myValue.valores.map((val) => (
          <li key={val.tamanho} className="flavour-value">
            <label>{val.tamanho}</label>
            <input
              type="number"
              step={0.5}
              min={0}
              max={500}
              value={val.valor}
              onChange={(e) =>
                setMyValue((prev) => ({
                  ...prev,
                  valores: prev.valores.map((x) =>
                    x.tamanho === val.tamanho
                      ? { ...val, valor: Number(e.target.value) }
                      : x
                  ),
                }))
              }
            />
          </li>
        ))}
      </ul>
      <button onClick={() => saveFlavour({ ...sabor, ...myValue })}>
        SALVAR
      </button>
    </FlavourStyle>
  );
};
