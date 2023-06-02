import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import {
  ConfirmacaoStyle,
  InfoStyle,
} from "@styles/pages/pedido/confirmacao/styles";
import { useMyOrder } from "@context/myOrderContext";
import { ButtonPrimary, ButtonSecondary } from "@styles/components/buttons";
import { useRouter } from "next/router";
import { ICliente } from "@models/order";
import { IPizza } from "@models/item";
import { IOutro } from "@models/outro";
import Link from "next/link";
import { formatCurrency } from "@util/format";
import { env } from "@config/env";
import TextContainer from "@components/textContainer";
import BottomControls from "@components/pedido/bottomControls";
import { toast } from "react-toastify";
import axios from "axios";

interface IData {
  customer: ICliente;
  type: "retirada" | "entrega";
}

const Confirmacao: NextPage<{ api_url: string; bairroNome: string }> = ({
  api_url,
  bairroNome,
}) => {
  const { myOrder, setId, newOrder } = useMyOrder();
  const router = useRouter();

  const Info = ({ name, value }: { name: string; value: string }) => {
    return (
      <InfoStyle>
        <h5 className="title">{name}</h5>
        <h4 className="value">{value.replace(/---.+---\n/g, "")}</h4>
      </InfoStyle>
    );
  };

  const customer =
    !!myOrder && myOrder?.cliente?.nome?.length > 0
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
    !!myOrder && myOrder.tipo === "entrega" && myOrder?.cliente?.endereco?.rua
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
    !!myOrder && myOrder?.itens?.length > 0
      ? `---ITENS---
${myOrder.itens.map((item) =>
  item.hasOwnProperty("sabores")
    ? `- --Pizza ${(item as IPizza).tamanho.nome.toUpperCase()}-- 
Sabor${(item as IPizza).sabores.length > 1 ? "es" : ""}: ${(
        item as IPizza
      ).sabores
        .map((s) => s.nome.split(" ").slice(0, -1).join(" ").toUpperCase())
        .join(", ")}${
        !!item.observacao
          ? `
${item.observacao}`
          : ""
      }`
    : `- --${(item as IOutro).nome.toUpperCase()}${
        !!item.observacao
          ? `
${item.observacao}`
          : "--"
      }`
).join(`

`)}`
      : "";

  const total =
    !!myOrder &&
    `---TOTAL---
ITENS: ${formatCurrency(
      myOrder.itens.reduce((acc, item) => acc + item.valor, 0)
    )}${
      myOrder.tipo === "entrega"
        ? myOrder.taxaEntrega ?? 0 > 0
          ? `
ENTREGA: ${formatCurrency(myOrder.taxaEntrega)}`
          : `
(FALTA TAXA DE ENTREGA)`
        : ""
    }${`
VALOR TOTAL: ${formatCurrency(
      myOrder.itens.reduce((acc, item) => acc + item.valor, 0) +
        (myOrder.tipo === "entrega" ? myOrder.taxaEntrega : 0)
    )}`}`;

  const payment =
    !!myOrder && myOrder?.pagamentos?.length > 0
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
      : `---PAGAMENTO---
NÃO INFORMADO.
      `;

  const confirm = () => {
    const sendOrder = async () => {
      const order = {
        ...myOrder,
        itens: myOrder.itens.map((x) => ({
          ...x,
          tamanho: (x as IPizza)?.tamanho?.nome ?? undefined,
          observacoes: x.observacao,
        })),
        endereco:
          myOrder.tipo === "entrega"
            ? {
                ...myOrder.cliente?.endereco,
                local: myOrder.cliente?.endereco?.localDeEntrega,
                referencia: myOrder.cliente?.endereco?.pontoDeReferencia,
                bairro: bairroNome,
              }
            : null,
        historico: [{ tipo: "enviado", data: new Date() }],
        pagamento: myOrder.pagamentos,
      };

      const { data } = await axios.post<any>(`${api_url}/pedidos`, order, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data?.id) {
        setId(data.id);
      }
    };

    const whatsAppLink = encodeURI(
      `https://api.whatsapp.com/send?${
        env.whatsapp ? `phone=${env.whatsapp}&` : ""
      }text=${`${customer.replace(/;/g, "*")}`}${
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
    );

    sendOrder()
      .then(() => console.info("Pedido enviado ao backend"))
      .catch((e) => console.error(e.message, e.stack));

    window.open(whatsAppLink, "_blank");
  };

  if (!myOrder) return <></>;
  return (
    <ConfirmacaoStyle>
      {myOrder.id ? (
        <TextContainer title="Pronto! Você enviou seu pedido!" />
      ) : (
        <TextContainer
          title="CONFIRMAÇÃO"
          subtitle="CONFIRME OS DADOS ANTES DE ENVIAR AO NOSSO WHATSAPP"
          description="*Podem haver alterações nos valores. Ao enviar, aguarde a confirmação
          dos nossos atendentes!*"
        />
      )}
      <div className="menu">
        <Info name="Cliente" value={customer.replace(/;/g, "")} />
        {!!myOrder && myOrder.tipo === "entrega" && (
          <Info name="Endereço" value={address} />
        )}
        <Info name="Itens" value={items.replace(/-- | --/g, "")} />
        <Info name="Total" value={total} />
        <Info name="Pagamento" value={payment} />
      </div>

      {myOrder.id ? (
        <BottomControls
          secondaryButton={{
            click: () => {
              newOrder();
              router.push("/pedido");
            },
            text: "QUERO FAZER MAIS UM PEDIDO!",
          }}
        />
      ) : (
        <BottomControls
          backButton
          primaryButton={{
            click: confirm,
            text: "ENVIAR PARA A PIZZARIA",
          }}
        />
      )}
    </ConfirmacaoStyle>
  );
};

export default Confirmacao;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    let bairroNome = "";

    if (ctx.query.bairro) {
      const bairros = await (
        await fetch(`${env.apiURL}/bairros?id=${ctx.query.bairro}`, {
          headers: { "Content-Type": "application/json" },
        })
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
        api_url: env.apiURL,
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
