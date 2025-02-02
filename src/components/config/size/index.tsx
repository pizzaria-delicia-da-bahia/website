import { FC, useState } from "react";
import { toast } from "react-toastify";
import { IPizzaTamanho } from "@models/pizza";
import { SizeStyle } from "./styles";

interface IOtherInfo {
  name: string;
  value: number;
  setValue: (value: number) => void;
  isInt?: boolean;
}

const OtherInfo: FC<IOtherInfo> = ({
  name,
  value,
  setValue,
  isInt = false,
}) => (
  <section>
    <label>{name}</label>
    <input
      type="number"
      step={isInt ? 1 : 0.5}
      min={0}
      max={500}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
    />
  </section>
);

export const Size: FC<{ tamanho: IPizzaTamanho; api_url: string }> = ({
  api_url,
  tamanho,
}) => {
  const [myValue, setMyValue] = useState<IPizzaTamanho>(tamanho);

  const saveSize = async (tamanho: IPizzaTamanho) => {
    const response = await fetch(
      `${api_url}/pizzas/tamanhos?id=${tamanho.id}`,
      {
        method: (tamanho.id ?? "") === "" ? "POST" : "PATCH",
        body: JSON.stringify(tamanho),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 200) {
      toast("Tamanho alterado ✅", { type: "success" });
    } else {
      toast("Erro ❌", { type: "error" });
    }
  };

  const updateValue = (name: string, value: number) => {
    setMyValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <SizeStyle>
      <div className="name">
        <label>{tamanho.nome}</label>
        <input
          type="checkbox"
          checked={myValue.visivel}
          onChange={(e) =>
            setMyValue((prev) => ({ ...prev, visivel: e.target.checked }))
          }
        />
      </div>
      <div className="other-info">
        <OtherInfo
          name="Tamanho (CM)"
          value={myValue.tamanhoAprox}
          setValue={(v) => updateValue("tamanhoAprox", v)}
        />
        <OtherInfo
          name="Fatias (QTD)"
          value={myValue.fatias}
          setValue={(v) => updateValue("fatias", v)}
          isInt={true}
        />
        <OtherInfo
          name="Sabores (QTD)"
          value={myValue.maxSabores}
          setValue={(v) => updateValue("maxSabores", v)}
          isInt={true}
        />
      </div>

      <button onClick={() => saveSize(myValue)}>SALVAR</button>
    </SizeStyle>
  );
};
