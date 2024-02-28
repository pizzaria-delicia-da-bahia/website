import { FC, useState } from "react";
import { toast } from "react-toastify";
import {
  IPizzaGrupo,
  IPizzaSabor,
  IPizzaSaborValor,
  IPizzaTamanho,
} from "@models/pizza";
import { FlavourStyle, GrupoSelectorStyle } from "./styles";
import { Toggle } from "@components/toggle";
import { Tag } from "@components/tag";
import { createPortal } from "react-dom";

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
      toast("Sabor alterado ✅", { type: "success" });

      !sabor.nome.length && setMyValue(sabor);
    }
  };

  const GrupoSelector = () => {
    return (
      <GrupoSelectorStyle className="grupo">
        <div className="container">
          <header>
            <button onClick={() => setGrupoSelector(false)}>x</button>
          </header>
          <main>
            <h1>Selecione o grupo</h1>

            <select
              className="grupo"
              value={myValue.grupoId}
              onChange={(e) => {
                setMyValue((prev) => ({
                  ...prev,
                  grupoId: e.target.value,
                }));

                setGrupoSelector(false);
              }}
            >
              <option value={null} disabled>
                --Selecione--
              </option>
              {grupos.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nome}
                </option>
              ))}
            </select>
          </main>
        </div>
      </GrupoSelectorStyle>
    );
  };

  const [grupoSelector, setGrupoSelector] = useState(false);

  return (
    <>
      <FlavourStyle>
        <div className="left">
          <Toggle
            checked={myValue.disponivel}
            toggle={() =>
              setMyValue((prev) => ({ ...prev, disponivel: !prev.disponivel }))
            }
          />
        </div>
        <div className="center">
          <input
            id="name"
            type="text"
            placeholder="Nome do sabor"
            value={myValue.nome}
            onChange={(e) =>
              setMyValue((prev) => ({ ...prev, nome: e.target.value }))
            }
          />
          <div className="center-bottom">
            <Tag className="tipo" onClick={() => setGrupoSelector(true)}>
              {grupos.find((x) => x.id === myValue.grupoId).nome}
            </Tag>
            <hr />
            <input
              className="ingredientes"
              type="text"
              placeholder="Calabresa, Cebola, Cheddar"
              value={myIngredientes}
              onChange={(e) => setMyIngredientes(e.target.value)}
            />
          </div>
        </div>
        <ul className="flavour-values">
          {myValue.valores.map((val) => (
            <li key={val.tamanhoId} className="flavour-value">
              <label>{tamanhos.find((x) => x.id === val.tamanhoId).nome}</label>
              <div className="value">
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
              </div>
            </li>
          ))}
        </ul>
        {/* <button
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
      </button> */}
      </FlavourStyle>
      {grupoSelector && createPortal(<GrupoSelector />, document.body)}
    </>
  );
};
