import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import {
  ConfirmacaoStyle,
  InfoStyle,
} from "../../../styles/pages/pedido/confirmacao/styles";
import { useMyOrder } from "../../../context/myOrderContext";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../../styles/components/buttons";
import { useRouter } from "next/router";
import { ICLiente } from "../../../types/order";
import { IPizza } from "../../../types/item";
import { IOutro } from "../../../types/outro";
import Link from "next/link";
import { formatCurrency } from "../../../utitl/functions/format";

interface IData {
  customer: ICLiente;
  type: "retirada" | "entrega";
}

const Confirmacao: NextPage<{ bairroNome: string }> = ({ bairroNome }) => {
  const { myOrder, setInfo } = useMyOrder();
  const router = useRouter();

  useEffect(() => {
    if (
      !myOrder ||
      (myOrder.itens?.length ?? []) < 1 ||
      (myOrder.cliente?.nome ?? "") === "" ||
      (myOrder.cliente?.whatsapp ?? "") === "" ||
      (myOrder.tipo === "entrega" && (myOrder.cliente?.endereco ?? "") === "")
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
    myOrder?.cliente?.nome?.length > 0
      ? `---CLIENTE---
NOME: ${myOrder.cliente.nome.toUpperCase()}
WHATSAPP: ${myOrder.cliente.whatsapp}
${
  myOrder.tipo === "retirada"
    ? ";VOU RETIRAR NA PIZZARIA;"
    : ";QUERO O DELIVERY;"
}`
      : "";

  const address =
    myOrder.tipo === "entrega" && myOrder?.cliente?.endereco?.rua
      ? `---ENTREGA---
ENDEREÇO: ${myOrder.cliente.endereco.rua.toUpperCase()}${
          myOrder.cliente.endereco.numero?.length > 0
            ? `, ${myOrder.cliente.endereco.numero}`
            : ""
        }${`
BAIRRO: ${bairroNome}`}${
          myOrder.cliente.endereco.cep?.length > 0
            ? `
CEP: ${myOrder.cliente.endereco.cep}`
            : ""
        }${
          myOrder.cliente.endereco.localDeEntrega?.length > 0
            ? `
LOCAL DE ENTREGA: ${myOrder.cliente.endereco.localDeEntrega.toUpperCase()}`
            : ""
        }${
          myOrder.cliente.endereco.pontoDeReferencia?.length > 0
            ? `
PONTO DE REFERÊNCIA: ${myOrder.cliente.endereco.pontoDeReferencia.toUpperCase()}`
            : ""
        }`
      : "";

  const items =
    myOrder?.itens?.length > 0
      ? `---ITENS---
${myOrder.itens.map((item) =>
  item.hasOwnProperty("sabores")
    ? `- --Pizza ${(item as IPizza).tamanho.nome.toUpperCase()}-- 
Sabor${(item as IPizza).sabores.length > 1 ? "es" : ""}: ${(
        item as IPizza
      ).sabores
        .map((s) => s.nome.split(" ").slice(0, -1).join(" ").toUpperCase())
        .join(", ")}`
    : `- --${(item as IOutro).nome.toUpperCase()}--`
).join(`

`)}`
      : "";

  const total = `---TOTAL---
ITENS: ${formatCurrency(
    myOrder.itens.reduce((acc, item) => acc + item.valor, 0)
  )}${
    myOrder.tipo === "entrega"
      ? `
ENTREGA: ${formatCurrency(myOrder.taxaEntrega)}`
      : ""
  }${`
VALOR TOTAL: ${formatCurrency(
    myOrder.itens.reduce((acc, item) => acc + item.valor, 0) +
      (myOrder.tipo === "entrega" ? myOrder.taxaEntrega : 0)
  )}`}`;

  const payment =
    myOrder?.pagamentos?.length > 0
      ? `---PAGAMENTO---
${myOrder.pagamentos.map(
  (payment) =>
    `${
      payment.tipo === "cartao"
        ? "NO CARTÃO"
        : payment.tipo === "especie"
        ? "EM ESPÉCIE"
        : "NO PIX"
    }${
      payment.trocoPara > payment.valor
        ? `
TROCO PARA ${payment.trocoPara}`
        : payment.tipo === "especie"
        ? `
NÃO VOU PRECISAR DE TROCO`
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
        <h5>
          *Podem haver alterações nos valores. Ao enviar, aguarde a confirmação
          dos nossos atendentes!*
        </h5>
      </div>
      <div className="menu">
        <Info name="Cliente" value={customer.replace(/;/g, "")} />
        {myOrder.tipo === "entrega" && <Info name="Endereço" value={address} />}
        <Info name="Itens" value={items.replace(/-- | --/g, "")} />
        <Info name="Total" value={total} />
        <Info name="Pagamento" value={payment} />
      </div>
      <nav className="controls">
        <ButtonSecondary onClick={() => router.back()}>VOLTAR</ButtonSecondary>
        <Link
          href={encodeURI(
            `https://api.whatsapp.com/send?phone=+557188726927&text=${`${customer.replace(
              /;/g,
              "*"
            )}`}${
              address.replace(" ", "").length
                ? `

${address}`
                : ""
            }${
              items.replace(" ", "").length
                ? `

${items.replace(/ --/g, " _").replace(/-- /g, "_ ")}`
                : ""
            }${
              payment.replace(" ", "").length
                ? `

${payment}`
                : ""
            }`
              .replace(/---/g, "*")
              .replace(/--/g, "_")
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    let bairroNome = "";

    if (ctx.query.bairro) {
      const bairros = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bairros?id=${ctx.query.bairro}`
        )
      ).json();

      bairroNome = "NÃO ENCONTRADO";

      try {
        bairroNome = bairros[0].nome;
      } catch {
        console.error("bairro não encontrado");
      }
    }

    return {
      props: {
        bairroNome,
      },
    };
  } catch (err) {
    console.error((err as Error).message, (err as Error).stack);
    return {
      redirect: {
        destination: "/pedido",
        permanent: false,
      },
    };
  }
};
