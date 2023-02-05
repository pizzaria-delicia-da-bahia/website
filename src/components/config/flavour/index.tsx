import { FC, useState } from "react";
import {
  IPizzaGrupo,
  IPizzaSabor,
  IPizzaSaborValor,
  IPizzaTamanho,
} from "../../../types/pizza";
import { FlavourStyle } from "./styles";

export const Flavour: FC<{
  sabor: IPizzaSabor;
  api_url: string;
  tamanhos: Array<IPizzaTamanho>;
  grupos: Array<IPizzaGrupo>;
}> = ({ api_url, sabor, grupos, tamanhos }) => {
  const [myValue, setMyValue] = useState<IPizzaSabor>(sabor);
  const [myIngredientes, setMyIngredientes] = useState<string>(
    sabor.ingredientes.join(", ")
  );

  const saveFlavour = async (flavour: IPizzaSabor) => {
    const response = await fetch(`${api_url}/pizzas/sabores?id=${sabor.id}`, {
      method: (sabor.id ?? "").length > 0 ? "PATCH" : "POST",
      body: JSON.stringify(
        sabor.nome.length > 0 ? flavour : { grupo: "", sabor: flavour }
      ),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Sabor alterado ✅");
      !sabor.nome.length && setMyValue(sabor);
    }
  };

  return (
    <FlavourStyle>
      <div className="name">
        <input
          type="text"
          placeholder="Nome do sabor"
          value={myValue.nome}
          onChange={(e) =>
            setMyValue((prev) => ({ ...prev, nome: e.target.value }))
          }
        />
        <input
          type="checkbox"
          checked={myValue.disponivel}
          onChange={(e) =>
            setMyValue((prev) => ({ ...prev, disponivel: e.target.checked }))
          }
        />
        <select
          className="grupo"
          value={myValue.grupoId}
          onChange={(e) =>
            setMyValue((prev) => ({
              ...prev,
              grupoId: e.target.value,
            }))
          }
        >
          <option value={null}>--Selecione--</option>
          {grupos.map((g) => (
            <option key={g.id} value={g.id}>
              {g.nome}
            </option>
          ))}
        </select>
        <input
          className="ingredientes"
          type="text"
          placeholder="Calabresa, Cebola, Cheddar"
          value={myIngredientes}
          onChange={(e) => setMyIngredientes(e.target.value)}
        />
      </div>
      <ul className="flavour-values">
        {myValue.valores.map((val) => (
          <li key={val.tamanhoId} className="flavour-value">
            <label>{tamanhos.find((x) => x.id === val.tamanhoId).nome}</label>
            <input
              type="number"
              step={1}
              min={0}
              max={500}
              value={val.valor}
              onChange={(e) =>
                setMyValue((prev) => ({
                  ...prev,
                  valores: prev.valores.map((x) =>
                    x.tamanhoId === val.tamanhoId
                      ? { ...val, valor: Number(e.target.value) }
                      : x
                  ),
                }))
              }
            />
          </li>
        ))}
      </ul>
      <button
        disabled={
          !Array.isArray(
            myIngredientes
              .replace(/(\s\s+)/g, " ")
              .trim()
              .split(", ")
          )
        }
        onClick={() =>
          saveFlavour({
            ...sabor,
            ...myValue,
            ingredientes: myIngredientes
              .replace(/(\s\s+)/g, " ")
              .trim()
              .split(", "),
          })
        }
      >
        SALVAR
      </button>
    </FlavourStyle>
  );
};
