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
import { formatCurrency } from "../../../utitl/functions/format";
import { useRouter } from "next/router";
import { EOrderType, ICustomer, INeighbourhood } from "../../../types/order";
import { sleep } from "../../../utitl/functions/misc";
import { MyInput } from "../../../components/pedido/myInput";
import { useNotification } from "../../../components/notification";

interface IData {
  customer: ICustomer;
  type: EOrderType;
}

const InformacoesAdicionais: NextPage<{
  api_url: string;
  neighbourhoods: INeighbourhood[];
}> = ({ api_url, neighbourhoods }) => {
  const { myOrder, setInfo, setFee } = useMyOrder();
  const [data, setData] = useState<IData | null>(null);
  const router = useRouter();
  const { notification } = useNotification();

  const getCustomerFromLocalStorage = () => {
    const customer =
      (JSON.parse(localStorage.getItem("customer")) as ICustomer) ?? null;

    setData({
      customer: {
        name: customer?.name ?? "",
        whatsapp: customer?.whatsapp ?? "",
        address: customer?.address ?? {
          street: "",
          number: "",
          place: "",
          reference: "",
          neighbourhood: { id: null, name: "" },
          cep: "",
        },
      },
      type: null,
    });
  };
  useEffect(() => {
    getCustomerFromLocalStorage();
  }, []);

  const next = async () => {
    try {
      const query = queryString({
        ...data.customer.address,
        neighbourhood: data.customer.address?.neighbourhood?.id ?? null,
      });

      const { taxa } = await (
        await fetch(`${api_url}/taxa${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      setInfo(data.customer, data.type, Number(taxa ?? 0));
      sleep();

      router.push(`/pedido/pagamento`);
    } catch (err) {
      console.error(err, err.stack);
      alert("Erro ❌");
    }
  };

  const searchCEP = async () => {
    const { enderecos } = (await (
      await fetch(`${api_url}/enderecos?cep=${data.customer.address.cep}`, {
        headers: { "Content-Type": "application/json" },
      })
    ).json()) as {
      enderecos: Array<{
        bairro: { id: number; nome: string };
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
      customer: {
        ...prev.customer,
        address: {
          ...prev.customer.address,
          neighbourhood: { id: e.bairro.id, name: e.bairro.nome },
          street: e.rua,
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
              checked={(data && data.type === EOrderType.delivery) ?? false}
              onChange={(e) =>
                e.target.checked &&
                setData((prev) => ({ ...prev, type: EOrderType.delivery }))
              }
            />
            <label htmlFor="delivery">QUERO DELIVERY</label>
          </span>
          <span>
            <input
              name="ordertype"
              id="withdraw"
              type={"radio"}
              checked={(data && data.type === EOrderType.withdraw) ?? false}
              onChange={(e) =>
                e.target.checked &&
                setData((prev) => ({ ...prev, type: EOrderType.withdraw }))
              }
            />
            <label htmlFor="withdraw">VOU BUSCAR</label>
          </span>
        </section>
        <section className="customer-info">
          <MyInput
            name="NOME *"
            type="name"
            value={(data && data.customer.name) ?? ""}
            setValue={(value) =>
              setData((prev) => ({
                ...prev,
                customer: { ...prev.customer, name: value as string },
              }))
            }
          />
          <MyInput
            name="WHATSAPP *"
            type="phoneNumber"
            value={(data && data.customer.whatsapp) ?? ""}
            setValue={(value) =>
              setData((prev) => ({
                ...prev,
                customer: { ...prev.customer, whatsapp: value as string },
              }))
            }
          />
          <section
            className={`address-info${
              !data || data.type !== EOrderType.delivery ? " disabled" : ""
            }`}
          >
            <div className={`input-group cep-endereco-n`}>
              <div className="cep">
                <MyInput
                  tabIndex={
                    !data || data.type != EOrderType.delivery ? -1 : undefined
                  }
                  name="CEP"
                  type="phoneNumber"
                  placeholder="EX: 40000-000"
                  value={(data && data.customer.address.cep) ?? ""}
                  setValue={(value) =>
                    setData((prev) => ({
                      ...prev,
                      customer: {
                        ...prev.customer,
                        address: {
                          ...prev.customer.address,
                          cep: value as string,
                        },
                      },
                    }))
                  }
                />
                <button
                  type="button"
                  disabled={
                    String(data?.customer?.address?.cep).replace(/[^0-9]/g, "")
                      .length !== 8
                  }
                  onClick={searchCEP}
                >
                  🔎
                </button>
              </div>
              <MyInput
                tabIndex={
                  !data || data.type != EOrderType.delivery ? -1 : undefined
                }
                name="ENDEREÇO (RUA/AVENIDA) *"
                placeholder="EX: AVENIDA ANITA GARIBALDI"
                type="address"
                value={(data && data.customer.address.street) ?? ""}
                setValue={(value) =>
                  setData((prev) => ({
                    ...prev,
                    customer: {
                      ...prev.customer,
                      address: {
                        ...prev.customer.address,
                        street: value as string,
                      },
                    },
                  }))
                }
              />
              <MyInput
                tabIndex={
                  !data || data.type != EOrderType.delivery ? -1 : undefined
                }
                name="Nº"
                placeholder="EX: 427-B"
                type="text"
                value={(data && data.customer.address.number) ?? ""}
                setValue={(value) =>
                  setData((prev) => ({
                    ...prev,
                    customer: {
                      ...prev.customer,
                      address: {
                        ...prev.customer.address,
                        number: value as string,
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
                  value={data?.customer?.address?.neighbourhood?.id}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      customer: {
                        ...prev.customer,
                        address: {
                          ...prev.customer.address,
                          neighbourhood: {
                            id: Number(e.target.value),
                            name: e.target.innerText,
                          },
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
                tabIndex={
                  !data || data.type != EOrderType.delivery ? -1 : undefined
                }
                name="LOCAL DE ENTREGA"
                placeholder="EX: COND. ONDINA TOP, EDF. FLORES, AP. 101"
                type="text"
                value={(data && data.customer.address.place) ?? ""}
                setValue={(value) =>
                  setData((prev) => ({
                    ...prev,
                    customer: {
                      ...prev.customer,
                      address: {
                        ...prev.customer.address,
                        place: value as string,
                      },
                    },
                  }))
                }
              />
              <MyInput
                tabIndex={
                  !data || data.type != EOrderType.delivery ? -1 : undefined
                }
                name="PONTO DE REFERÊNCIA"
                placeholder="EX: EM FRENTE AO MERCADO NOVA ESPERANÇA"
                type="text"
                value={(data && data.customer.address.reference) ?? ""}
                setValue={(value) =>
                  setData((prev) => ({
                    ...prev,
                    customer: {
                      ...prev.customer,
                      address: {
                        ...prev.customer.address,
                        reference: value as string,
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
            data.type === null ||
            data.customer.name === "" ||
            data.customer.whatsapp === "" ||
            (data.type === EOrderType.delivery &&
              data.customer.address.street === "") ||
            data.customer.name.length < 2 ||
            data.customer.whatsapp.length < 8 ||
            (data.type === EOrderType.delivery &&
              (data.customer.address?.street?.length ?? 0) < 5) ||
            (data.type === EOrderType.delivery &&
              !data.customer.address?.neighbourhood?.id)
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
  const { bairros } = await (
    await fetch(`${process.env.API_URL}/bairros`)
  ).json();

  return {
    props: {
      api_url: `${process.env.API_URL}`,
      neighbourhoods: bairros,
    },
  };
};
