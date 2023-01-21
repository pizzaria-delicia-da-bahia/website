import { NextPage } from "next";
import { useEffect, useState } from "react";
import { InformacoesAdicionaisStyle } from "../../../styles/pages/pedido/informacoes-adicionais/styles";
import { useMyOrder } from "../../../context/myOrderContext";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../../styles/components/buttons";
import { formatCurrency } from "../../../utitl/functions/format";
import { useRouter } from "next/router";
import { EOrderType, ICustomer } from "../../../types/order";
import { sleep } from "../../../utitl/functions/misc";
import { MyInput } from "../../../components/pedido/myInput";

interface IData {
  customer: ICustomer;
  type: EOrderType;
}

const InformacoesAdicionais: NextPage = () => {
  const { myOrder, setInfo } = useMyOrder();
  const [data, setData] = useState<IData | null>(null);
  const router = useRouter();

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
          cep: "",
        },
      },
      type: null,
    });
  };
  useEffect(() => {
    getCustomerFromLocalStorage();
  }, []);

  return (
    <InformacoesAdicionaisStyle>
      <div className="text">
        <h1>INFORMAÇÕES ADICIONAIS</h1>
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
            className={`address-info ${
              !data || data.type !== EOrderType.delivery
                ? "disabled"
                : undefined
            }`}
          >
            <div className={`input-group cep-endereco-n`}>
              <MyInput
                tabIndex={
                  !data || data.type != EOrderType.delivery ? -1 : undefined
                }
                name="CEP"
                type="text"
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
            <div className={`input-group local-referencia`}>
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

          <div className="place-type"></div>
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
              (data.customer.address?.street?.length ?? 0) < 5)
          }
          onClick={() => {
            setInfo(data.customer, data.type);
            sleep();
            router.push(
              `/pedido/pagamento${
                data.type === EOrderType.delivery &&
                data.customer.address.street.length > 0
                  ? `/address=${
                      data.customer.address?.cep?.replace(/[^\d]/g, "") ||
                      data.customer.address.street
                    }`
                  : ""
              }`
            );
          }}
        >
          PRÓXIMO PASSO
        </ButtonPrimary>
      </nav>
    </InformacoesAdicionaisStyle>
  );
};

export default InformacoesAdicionais;
