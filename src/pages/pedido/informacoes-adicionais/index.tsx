import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  BairroSelect,
  InformacoesAdicionaisStyle,
} from "@styles/pages/pedido/informacoes-adicionais/styles";
import { useMyOrder } from "@context/myOrderContext";
import { queryString } from "js-query-string-object";
import {
  Button,
  ButtonPrimary,
  ButtonSecondary,
} from "@styles/components/buttons";
import { useRouter } from "next/router";
import { ICliente } from "@models/order";
import { MyInput } from "@components/pedido/myInput";
import { IBairro } from "@models/endereco";
import { removeAccents } from "@util/format";
import { toast } from "react-toastify";
import Loading from "@components/loading";
import { env } from "@config/env";
import TextContainer from "@components/textContainer";
import BottomControls from "@components/pedido/bottomControls";
import Modal from "@components/modal";
import { colors } from "@styles/colors";
import { usePromo } from "@context/promoContext";

interface IData {
  cliente: ICliente;
  tipo: "retirada" | "entrega" | null;
}

const InformacoesAdicionais: NextPage = () => {
  const { setInfo, myOrder } = useMyOrder();
  const { getTaxaGratis } = usePromo();
  const [data, setData] = useState<IData | null>(null);
  const router = useRouter();
  const [nextInactive, setNextInactive] = useState<boolean>(false);
  const [neighbourhoods, setNeighbourhoods] = useState<IBairro[]>([]);
  const [showModal, setShowModal] = useState<boolean>(true);

  const getCustomerFromLocalStorage = () => {
    const customer =
      (JSON.parse(localStorage.getItem("customer")) as ICliente) ?? null;

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

  const getNeighbourhoods = async () => {
    const response = await (
      await fetch(`${env.apiURL}/bairros`, {
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    setNeighbourhoods(response);
  };

  useEffect(() => {
    getNeighbourhoods();
    getCustomerFromLocalStorage();
  }, []);

  const next = async () => {
    try {
      setNextInactive(true);
      let endereco;
      if (data.tipo === "entrega") {
        const query = queryString({
          rua: removeAccents(data.cliente.endereco?.rua) ?? null,
          cep: data.cliente.endereco?.cep ?? null,
          bairroId: data.cliente.endereco?.bairroId ?? null,
          // number: data.cliente.endereco?.numero ?? null,
          // place: data.cliente.endereco?.localDeEntrega ?? null,
          // reference: data.cliente.endereco?.pontoDeReferencia ?? null,
        });

        endereco = (await (
          await fetch(`${env.apiURL}/taxa${query}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).json()) as { cep: string; rua: string; bairroId: string } | null;
      }

      const customer = {
        ...data.cliente,
        endereco: { ...data.cliente.endereco, ...(endereco ?? {}) },
      };
      customer.endereco.taxa = getTaxaGratis(myOrder.itens)
        ? 3
        : customer.endereco.taxa;
      setInfo(
        customer,
        data.tipo,
        getTaxaGratis(myOrder.itens) ? 0 : Number(endereco?.taxa ?? 0)
      );

      if (data.tipo === "retirada" || endereco?.cep) {
        router.push(`/pedido/pagamento`);
      } else {
        router.push(`/pedido/confirmacao/${data.cliente.endereco.bairroId}`);
      }
    } catch (err) {
      console.error(err, err.stack);
      setNextInactive(false);
    }
  };

  const searchCEP = async () => {
    try {
      const enderecos = (await (
        await fetch(
          `${env.apiURL}/enderecos?cep=${data.cliente.endereco.cep}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        )
      ).json()) as Array<{
        bairroId: string;
        cep: string;
        id: number;
        rua: string;
        taxa: number;
      }>;

      if (!enderecos?.length) throw new Error();

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
    } catch (err) {
      toast("Endereço não encontrado", { type: "error" });
      console.error((err as Error).message, (err as Error).stack);
    }
  };

  useEffect(() => {
    if (!showModal) {
      (document.querySelector("#NOME") as HTMLElement)?.focus();
    }
  }, [showModal]);

  return (
    <>
      <InformacoesAdicionaisStyle>
        {!neighbourhoods.length ? (
          <Loading />
        ) : (
          <>
            <TextContainer
              title="INFORMAÇÕES ADICIONAIS"
              description="OS CAMPOS COM * (ASTERISCO) SÃO OBRIGATÓRIOS"
            />
            <form className="menu">
              <section
                className={`ordertype${!data || !data.tipo ? " no-type" : ""}`}
              >
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
              <section
                className={`customer-info${
                  !data || !data.tipo ? " disabled" : ""
                }`}
              >
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
                        tabIndex={
                          !data || data.tipo != "entrega" ? -1 : undefined
                        }
                        name="CEP"
                        type="zipCode"
                        placeholder="EX: 40000-000"
                        value={
                          data?.tipo === "entrega"
                            ? data?.cliente?.endereco?.cep ?? ""
                            : ""
                        }
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
                          String(data?.cliente?.endereco?.cep).replace(
                            /[^0-9]/g,
                            ""
                          ).length !== 8
                        }
                        onClick={searchCEP}
                      >
                        🔎
                      </button>
                    </div>
                    <MyInput
                      tabIndex={
                        !data || data.tipo != "entrega" ? -1 : undefined
                      }
                      name="ENDEREÇO (RUA/AVENIDA) *"
                      placeholder="EX: AVENIDA ANITA GARIBALDI"
                      type="address"
                      value={
                        data?.tipo === "entrega"
                          ? data?.cliente?.endereco?.rua ?? ""
                          : ""
                      }
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
                      tabIndex={
                        !data || data.tipo != "entrega" ? -1 : undefined
                      }
                      name="Nº"
                      placeholder="EX: 427-B"
                      type="text"
                      max={7}
                      value={
                        data?.tipo === "entrega"
                          ? data?.cliente?.endereco?.numero ?? ""
                          : ""
                      }
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
                        value={
                          data?.tipo === "entrega"
                            ? data?.cliente?.endereco?.bairroId ?? ""
                            : ""
                        }
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
                        <option value={""}>--Selecione--</option>
                        {neighbourhoods.map((n) => (
                          <option value={n.id} key={n.id}>
                            {n.nome}
                          </option>
                        ))}
                      </select>
                    </BairroSelect>

                    <MyInput
                      tabIndex={
                        !data || data.tipo != "entrega" ? -1 : undefined
                      }
                      name="LOCAL DE ENTREGA"
                      placeholder="EX: COND. ONDINA TOP, EDF. FLORES, AP. 101"
                      type="text"
                      value={
                        data?.tipo === "entrega"
                          ? data?.cliente?.endereco?.localDeEntrega ?? ""
                          : ""
                      }
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
                      tabIndex={
                        !data || data.tipo != "entrega" ? -1 : undefined
                      }
                      name="PONTO DE REFERÊNCIA"
                      placeholder="EX: EM FRENTE AO MERCADO NOVA ESPERANÇA"
                      type="text"
                      value={
                        (data?.tipo === "entrega" &&
                          data?.cliente?.endereco?.pontoDeReferencia) ??
                        ""
                      }
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
              {/* {"geolocation" in navigator && (
                <button
                  type="button"
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(function (
                      position
                    ) {
                      console.log("asdasdasdasd", position);
                      //  toast(
                      //    `${position.coords.latitude} ${position.coords.longitude}`,
                      //    { type: "success" }
                      //  );
                    });
                  }}
                >
                  Obter localização automaticamente
                </button>
              )} */}
            </form>

            <BottomControls
              backButton
              primaryButton={{
                click: next,
                disabled:
                  nextInactive ||
                  !data ||
                  data.tipo === null ||
                  data.cliente.nome === "" ||
                  data.cliente.whatsapp === "" ||
                  (data.tipo === "entrega" &&
                    data.cliente.endereco.rua === "") ||
                  data.cliente.nome.length < 2 ||
                  data.cliente.whatsapp.length < 8 ||
                  (data.tipo === "entrega" &&
                    (data.cliente.endereco?.rua?.length ?? 0) < 5) ||
                  (data.tipo === "entrega" && !data.cliente.endereco?.bairroId),
              }}
            />
          </>
        )}
      </InformacoesAdicionaisStyle>
      {showModal && (
        <Modal
          className="withdraw-delivery-modal"
          label="Você vai retirar na pizzaria ou quer o delivery?"
          type={"custom"}
          buttons={
            <>
              <Button
                bgcolor={colors.elements}
                forecolor={colors.background}
                onClick={() => {
                  setData((prev) => ({ ...prev, tipo: "retirada" }));
                  setShowModal(false);
                }}
              >
                Vou buscar
                <br />
                🏭🍕
              </Button>

              <Button
                bgcolor={colors.elements}
                forecolor={colors.background}
                onClick={() => {
                  setData((prev) => ({ ...prev, tipo: "entrega" }));
                  setShowModal(false);
                }}
              >
                Quero delivery
                <br />
                🛵🏠
              </Button>
            </>
          }
        />
      )}
    </>
  );
};

export default InformacoesAdicionais;
