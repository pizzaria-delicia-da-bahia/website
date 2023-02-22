import { FC, useState } from "react";
import { toast } from "react-toastify";
import { IEndereco } from "@models/endereco";
import { AddressStyle } from "./styles";

export const Address: FC<{ endereco: IEndereco; api_url: string }> = ({
  api_url,
  endereco,
}) => {
  const [myValue, setMyValue] = useState<IEndereco>(endereco);

  const saveOther = async () => {
    const response = await fetch(`${api_url}/enderecos?id=${myValue.id}`, {
      method: "PATCH",
      body: JSON.stringify(myValue),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      toast("Item alterado ✅", { type: "success" });
    } else {
      toast("Erro ❌", { type: "error" });
    }
  };

  return (
    <AddressStyle>
      <div className="name">
        <label>{endereco.rua}</label>
        {/* <label>{address.cep}</label> */}
      </div>
      <section>
        <label>Taxa:</label>
        <input
          type="number"
          min={0}
          max={500}
          step={0.5}
          value={myValue.taxa}
          onChange={(e) =>
            setMyValue((prev) => ({ ...prev, taxa: Number(e.target.value) }))
          }
        />
      </section>
      <section>
        <label>Bairro:</label>
        <input
          list="my-select-list"
          type="text"
          placeholder="Bairro/Comunidade"
          value={myValue.bairroId}
          onChange={(e) =>
            setMyValue((prev) => ({ ...prev, bairro: e.target.value }))
          }
        />
        <datalist id="my-select-list">
          <option value="ONDINA">ONDINA</option>
          {/* {grupos.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))} */}
        </datalist>
      </section>
      <button onClick={saveOther}>SALVAR</button>
    </AddressStyle>
  );
};
