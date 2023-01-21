import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  ConfirmacaoStyle,
  InfoStyle,
} from "../../../styles/pages/pedido/confirmacao/styles";
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
import { IBebidaOutro, IPizza } from "../../../types/item";
import Link from "next/link";

interface IData {
  customer: ICustomer;
  type: EOrderType;
}

const Confirmacao: NextPage = () => {
  const { myOrder, setInfo } = useMyOrder();
  const router = useRouter();

  useEffect(() => {
    if (
      !myOrder ||
      (myOrder.items?.length ?? []) < 1 ||
      (myOrder.customer?.name ?? "") === "" ||
      (myOrder.customer?.whatsapp ?? "") === "" ||
      (myOrder.type === EOrderType.delivery &&
        (myOrder.customer?.address ?? "") === "")
    ) {
      router.push("/pedido");
    }
  }, []);

  useEffect(() => {
    if (!myOrder) router.back();
  }, []);

  const Info = ({ name, value }: { name: string; value: string }) => {
    return (
      <InfoStyle>
        {/* <h5 className="title">{name}</h5> */}
        <h4 className="value">{value}</h4>
      </InfoStyle>
    );
  };

  const customer =
    myOrder?.customer?.name?.length > 0
      ? `---CLIENTE---
NOME: ${myOrder.customer.name.toUpperCase()}
WHATSAPP: ${myOrder.customer.whatsapp}
${
  myOrder.type === EOrderType.withdraw
    ? "VOU RETIRAR NA PIZZARIA"
    : "QUERO O DELIVERY"
}`
      : "";

  const address =
    myOrder.type === EOrderType.delivery && myOrder?.customer?.address?.street
      ? `---ENTREGA---
ENDEREÇO: ${myOrder.customer.address.street.toUpperCase()}${
          myOrder.customer.address.number?.length > 0
            ? `, ${myOrder.customer.address.number}`
            : ""
        }${
          myOrder.customer.address.cep?.length > 0
            ? `
CEP: ${myOrder.customer.address.cep}`
            : ""
        }${
          myOrder.customer.address.place?.length > 0
            ? `
LOCAL: ${myOrder.customer.address.place.toUpperCase()}`
            : ""
        }${
          myOrder.customer.address.reference?.length > 0
            ? `
PONTO DE REFERÊNCIA: ${myOrder.customer.address.reference.toUpperCase()}`
            : ""
        }`
      : "";

  const items =
    myOrder?.items?.length > 0
      ? `---ITENS---
${myOrder.items.map((item) =>
  item.hasOwnProperty("sabores")
    ? `Pizza ${(item as IPizza).tamanho.nome.toUpperCase()}
Sabor${(item as IPizza).sabores.length > 1 ? "es" : ""}: ${(
        item as IPizza
      ).sabores
        .map((s) => s.nome.split(" ").slice(0, -1).join(" ").toUpperCase())
        .join(", ")}`
    : `${(item as IBebidaOutro).nome.toUpperCase()}`
).join(`

`)}`
      : "";

  const payment =
    myOrder?.payments?.length > 0
      ? `---PAGAMENTO---
${myOrder.payments.map(
  (payment) =>
    `${
      payment.type === "card"
        ? "NO CARTÃO"
        : payment.type === "cash"
        ? "EM ESPÉCIE"
        : "NO PIX"
    }${
      payment.changeFor > payment.value
        ? `
TROCO PARA ${payment.changeFor}`
        : ""
    }`
).join(`

`)}`
      : "";

  return (
    <ConfirmacaoStyle>
      <div className="text">
        <h1>CONFIRMAÇÃO</h1>
        <h4>CONFIRME OS DADOS DO PEDIDO ANTES DE ENVIAR AO NOSSO WHATSAPP</h4>
      </div>
      <div className="menu">
        <h3>
          Pedido PARA{" "}
          {myOrder.type === EOrderType.delivery
            ? "ENTREGA"
            : "RETIRAR NA PIZZARIA"}
        </h3>
        <Info name="Cliente" value={customer} />
        {myOrder.type === EOrderType.delivery && (
          <Info name="Endereço" value={address} />
        )}
        <Info name="Itens" value={items} />
        <Info name="Pagamento" value={payment} />
      </div>
      <nav className="controls">
        <ButtonSecondary onClick={() => router.back()}>VOLTAR</ButtonSecondary>
        <Link
          href={encodeURI(
            `https://api.whatsapp.com/send?phone=+5571988726927&text=
                ${`

${customer}`}${
              address.length
                ? `

${address}`
                : ""
            }${
              items.length
                ? `

${items}`
                : ""
            }${
              payment.length
                ? `

${payment}`
                : ""
            }`
          )}
          passHref
        >
          <ButtonPrimary>ENVIAR PARA A PIZZARIA</ButtonPrimary>
        </Link>
      </nav>
    </ConfirmacaoStyle>
  );
};

export default Confirmacao;

// export const getServerSideProps: GetServerSideProps = async () => {
// //   const { lanches } = await (
// //     await fetch(`${process.env.API_URL}/lanches`)
// //   ).json();
//   return {
//     props: {
//       enderecos,
//     },
//   };
// };
