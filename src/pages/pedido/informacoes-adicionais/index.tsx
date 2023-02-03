import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import {
  BairroSelect,
  InformacoesAdicionaisStyle,
} from "../../../styles/pages/pedido/informacoes-adicionais/styles";
import { useMyOrder } from "../../../context/myOrderContext";
import { queryString } from "js-query-string-object";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../../styles/components/buttons";
import { useRouter } from "next/router";
import { ICLiente } from "../../../types/order";
import { sleep } from "../../../utitl/functions/misc";
import { MyInput } from "../../../components/pedido/myInput";
import { useNotification } from "../../../components/notification";
import { IEndereco, IBairro } from "../../../types/endereco";

interface IData {
  cliente: ICLiente;
  tipo: "retirada" | "entrega" | null;
}

const InformacoesAdicionais: NextPage<{
  api_url: string;
  neighbourhoods: IBairro[];
}> = ({ api_url, neighbourhoods }) => {
  const { setInfo } = useMyOrder();
  const [data, setData] = useState<IData | null>(null);
  const router = useRouter();
  const { notification } = useNotification();

  const getCustomerFromLocalStorage = () => {
    const customer =
      (JSON.parse(localStorage.getItem("customer")) as ICLiente) ?? null;

    setData({
      cliente: {
        nome: customer?.nome ?? "",
        whatsapp: customer?.whatsapp ?? "",
        endereco: customer?.endereco ?? {
          rua: "",
          numero: "",
          localDeEntrega: "",
          pontoDeReferencia: "",
          bairroId: "",
          cep: "",
        },
      },
      tipo: null,
    });
  };
  useEffect(() => {
    getCustomerFromLocalStorage();
  }, []);

  const next = async () => {
    try {
      const query = queryString({
        ...data.cliente.endereco,
        neighbourhood: data.cliente.endereco?.bairroId ?? null,
      });

      const taxa = await (
        await fetch(`${api_url}/taxa${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      setInfo(data.cliente, data.tipo, Number(taxa ?? 0));
      sleep();

      router.push(`/pedido/pagamento`);
    } catch (err) {
      console.error(err, err.stack);
      alert("Erro ❌");
    }
  };

  const searchCEP = async () => {
    const enderecos = (await (
      await fetch(`${api_url}/enderecos?cep=${data.cliente.endereco.cep}`, {
        headers: { "Content-Type": "application/json" },
      })
    ).json()) as {
      enderecos: Array<{
        bairroId: string;
        cep: string;
        id: number;
        rua: string;
        taxa: number;
      }>;
    };

    if (!enderecos) {
      notification("❌ Endereço não localizado!");
      return;
    }
    const e = enderecos[0];

    setData((prev) => ({
      ...prev,
      cliente: {
        ...prev.cliente,
        endereco: {
          ...prev.cliente.endereco,
          bairroId: e.bairroId,
          rua: e.rua,
        },
      },
    }));
  };

  return (
    <InformacoesAdicionaisStyle>
      <div className="text">
        <h1>INFORMAÇÕES ADICIONAIS</h1>
        <p>OS CAMPOS COM * (ASTERISCO) SÃO OBRIGATÓRIOS</p>
      </div>
      <form className="menu">
        <section className="ordertype">
          <span>
            <input
              name="ordertype"
              id="delivery"
              type={"radio"}
              checked={(data && data.tipo === "entrega") ?? false}
              onChange={(e) =>
                e.target.checked &&
                setData((prev) => ({ ...prev, tipo: "entrega" }))
              }
            />
            <label htmlFor="delivery">QUERO DELIVERY</label>
          </span>
          <span>
            <input
              name="ordertype"
              id="withdraw"
              type={"radio"}
              checked={(data && data.tipo === "retirada") ?? false}
              onChange={(e) =>
                e.target.checked &&
                setData((prev) => ({ ...prev, tipo: "retirada" }))
              }
            />
            <label htmlFor="withdraw">VOU BUSCAR</label>
          </span>
        </section>
        <section className="customer-info">
          <MyInput
            name="NOME *"
            type="name"
            value={(data && data.cliente.nome) ?? ""}
            setValue={(value) =>
              setData((prev) => ({
                ...prev,
                cliente: { ...prev.cliente, nome: value as string },
              }))
            }
          />
          <MyInput
            name="WHATSAPP *"
            type="phoneNumber"
            value={(data && data.cliente.whatsapp) ?? ""}
            setValue={(value) =>
              setData((prev) => ({
                ...prev,
                cliente: { ...prev.cliente, whatsapp: value as string },
              }))
            }
          />
          <section
            className={`address-info${
              !data || data.tipo !== "entrega" ? " disabled" : ""
            }`}
          >
            <div className={`input-group cep-endereco-n`}>
              <div className="cep">
                <MyInput
                  tabIndex={!data || data.tipo != "entrega" ? -1 : undefined}
                  name="CEP"
                  type="zipCode"
                  placeholder="EX: 40000-000"
                  value={(data && data.cliente.endereco.cep) ?? ""}
                  setValue={(value) =>
                    setData((prev) => ({
                      ...prev,
                      cliente: {
                        ...prev.cliente,
                        endereco: {
                          ...prev.cliente.endereco,
                          cep: value as string,
                        },
                      },
                    }))
                  }
                />
                <button
                  type="button"
                  disabled={
                    String(data?.cliente?.endereco?.cep).replace(/[^0-9]/g, "")
                      .length !== 8
                  }
                  onClick={searchCEP}
                >
                  🔎
                </button>
              </div>
              <MyInput
                tabIndex={!data || data.tipo != "entrega" ? -1 : undefined}
                name="ENDEREÇO (RUA/AVENIDA) *"
                placeholder="EX: AVENIDA ANITA GARIBALDI"
                type="address"
                value={(data && data.cliente.endereco.rua) ?? ""}
                setValue={(value) =>
                  setData((prev) => ({
                    ...prev,
                    cliente: {
                      ...prev.cliente,
                      endereco: {
                        ...prev.cliente.endereco,
                        rua: value as string,
                      },
                    },
                  }))
                }
              />
              <MyInput
                tabIndex={!data || data.tipo != "entrega" ? -1 : undefined}
                name="Nº"
                placeholder="EX: 427-B"
                type="text"
                value={(data && data.cliente.endereco.numero) ?? ""}
                setValue={(value) =>
                  setData((prev) => ({
                    ...prev,
                    cliente: {
                      ...prev.cliente,
                      endereco: {
                        ...prev.cliente.endereco,
                        numero: value as string,
                      },
                    },
                  }))
                }
              />
            </div>
            <div className={`input-group bairro-local-referencia`}>
              <BairroSelect>
                <label htmlFor="bairro-select">BAIRRO *</label>
                <select
                  name="bairro-select"
                  value={data?.cliente?.endereco?.bairroId ?? null}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      cliente: {
                        ...prev.cliente,
                        endereco: {
                          ...prev.cliente.endereco,
                          bairroId: e.target.value,
                        },
                      },
                    }))
                  }
                >
                  <option value={null}>--Selecione--</option>
                  {neighbourhoods.map((n) => (
                    <option value={n.id} key={n.id}>
                      {n.nome}
                    </option>
                  ))}
                </select>
              </BairroSelect>

              <MyInput
                tabIndex={!data || data.tipo != "entrega" ? -1 : undefined}
                name="LOCAL DE ENTREGA"
                placeholder="EX: COND. ONDINA TOP, EDF. FLORES, AP. 101"
                type="text"
                value={(data && data.cliente.endereco.localDeEntrega) ?? ""}
                setValue={(value) =>
                  setData((prev) => ({
                    ...prev,
                    cliente: {
                      ...prev.cliente,
                      endereco: {
                        ...prev.cliente.endereco,
                        localDeEntrega: value as string,
                      },
                    },
                  }))
                }
              />
              <MyInput
                tabIndex={!data || data.tipo != "entrega" ? -1 : undefined}
                name="PONTO DE REFERÊNCIA"
                placeholder="EX: EM FRENTE AO MERCADO NOVA ESPERANÇA"
                type="text"
                value={(data && data.cliente.endereco.pontoDeReferencia) ?? ""}
                setValue={(value) =>
                  setData((prev) => ({
                    ...prev,
                    cliente: {
                      ...prev.cliente,
                      endereco: {
                        ...prev.cliente.endereco,
                        pontoDeReferencia: value as string,
                      },
                    },
                  }))
                }
              />
            </div>
          </section>
        </section>
      </form>
      <nav className="bottom-controls">
        <ButtonSecondary onClick={() => router.back()}>VOLTAR</ButtonSecondary>
        <ButtonPrimary
          disabled={
            !data ||
            data.tipo === null ||
            data.cliente.nome === "" ||
            data.cliente.whatsapp === "" ||
            (data.tipo === "entrega" && data.cliente.endereco.rua === "") ||
            data.cliente.nome.length < 2 ||
            data.cliente.whatsapp.length < 8 ||
            (data.tipo === "entrega" &&
              (data.cliente.endereco?.rua?.length ?? 0) < 5) ||
            (data.tipo === "entrega" && !data.cliente.endereco?.bairroId)
          }
          onClick={() => next()}
        >
          PRÓXIMO PASSO
        </ButtonPrimary>
      </nav>
    </InformacoesAdicionaisStyle>
  );
};

export default InformacoesAdicionais;

export const getServerSideProps: GetServerSideProps = async () => {
  const bairros = await (await fetch(`${process.env.API_URL}/bairros`)).json();

  return {
    props: {
      api_url: `${process.env.API_URL}`,
      neighbourhoods: bairros,
    },
  };
};
