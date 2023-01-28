import { FC, useState } from "react";
import { IBebidaOutro, ISabor, ITamanho, IValor } from "../../../types/item";
import { OtherStyle } from "./styles";

export const Other: FC<{ item: IBebidaOutro; api_url: string }> = ({
  api_url,
  item,
}) => {
  const [myValue, setMyValue] = useState<IBebidaOutro>(item);

  const saveOther = async () => {
    const response = await fetch(`${api_url}`, {
      method: item.nome === "" ? "POST" : "PATCH",
      body: JSON.stringify(myValue),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Item alterado ✅");
      !item.nome.length && setMyValue(item);
    } else {
      alert("Erro ❌");
    }
  };

  return (
    <OtherStyle>
      <div className="name">
        <img src={myValue.imagemUrl} width={50} height={50} />
        {item && <label>{item.nome}</label>}
        {item.nome === "" && (
          <section className="section-data">
            <label>Nome:</label>
            <input
              type="text"
              value={myValue.nome}
              onChange={(e) =>
                setMyValue((prev) => ({ ...prev, nome: e.target.value }))
              }
            />
          </section>
        )}
        <input
          type="checkbox"
          checked={myValue.disponivel}
          onChange={(e) =>
            setMyValue((prev) => ({ ...prev, disponivel: e.target.checked }))
          }
        />
      </div>
      <section className="section-data">
        <label>Valor:</label>
        <input
          type="number"
          min={0}
          max={500}
          step={0.5}
          value={myValue.valor}
          onChange={(e) =>
            setMyValue((prev) => ({ ...prev, valor: Number(e.target.value) }))
          }
        />
      </section>
      <section className="section-data">
        <label>Imagem:</label>
        <input
          type="url"
          placeholder="https://www.link-da-imagem/imagem.png"
          value={myValue.imagemUrl}
          pattern="https://.*"
          onChange={(e) =>
            setMyValue((prev) => ({ ...prev, imagemUrl: e.target.value }))
          }
        />
      </section>
      <button onClick={saveOther}>SALVAR</button>
    </OtherStyle>
  );
};
