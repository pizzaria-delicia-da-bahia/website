import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Carousel from "@components/carousel";
import CarouselItem from "@components/carousel/carouselItem";
import { useMyOrder } from "@context/myOrderContext";
import { PedidoStyle } from "@styles/pages/pedido/styles";
import TextContainer from "@components/textContainer";
import BottomControls from "@components/pedido/bottomControls";
import { Dots } from "@components/dots";
import { getWorkingTime } from "@data/workingTime";
import { env } from "@config/env";
import { IOutro } from "@models/outro";
import { useState } from "react";
import Modal from "@components/modal";

const Pedido: NextPage<{ isWorking: boolean }> = ({ isWorking }) => {
  const items = [
    {
      name: "LANCHES",
      route: "pedido/lanche",
      image: "/images/pedido-lanche.svg",
    },
    {
      name: "PIZZAS",
      route: "pedido/pizza/tamanho",
      image: "/images/pedido-pizza.svg",
    },
    {
      route: "pedido/dia-das-maes",
      image: "/images/promocao.svg",
    },
    {
      name: "BEBIDAS",
      route: "pedido/bebida",
      image: "/images/pedido-bebida.svg",
    },
  ];
  const { myOrder } = useMyOrder();
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const askIfCustomerWantsDrink = () => {
    setShowModal(true);
  };

  if (!isWorking)
    return (
      <PedidoStyle>
        <TextContainer
          title="OPA! ESTAMOS FECHADOS NESTE MOMENTO."
          subtitle="NOSSO HORÁRIO 
       DE FUNCIONAMENTO É DE TERÇA À DOMINGO, DAS 18:30 ATÉ ÀS 23:30"
        />
      </PedidoStyle>
    );

  return (
    <PedidoStyle>
      <TextContainer title="MONTE SEU PEDIDO" subtitle="ADICIONE UM ITEM" />

      <div className="menu">
        <Carousel length={items.length} defaultSelectedIndex={2}>
          {items.map((item, index) => (
            <CarouselItem
              key={item.route}
              image={{ src: item.image, w: 100 }}
              title={item.name}
              route={item.route}
              index={index}
            />
          ))}
        </Carousel>
      </div>
      <Dots items={items} />
      <BottomControls
        secondaryButton={{
          click: () => router.push("/pedido/itens"),
          disabled: (myOrder?.itens?.length ?? 0) < 1,
          text: "MEUS ITENS",
          badge: myOrder?.itens?.length,
        }}
        primaryButton={{
          click: () => {
            if (
              myOrder?.itens.some((x) =>
                (x as IOutro)?.nome?.toUpperCase().includes("REFRIGERANTE")
              )
            ) {
              router.push("/pedido/informacoes-adicionais");
            } else {
              askIfCustomerWantsDrink();
            }
          },
          disabled: (myOrder?.itens?.length ?? 0) < 1,
        }}
      />
      {showModal && (
        <Modal
          label="Adicionar Refrigerante?"
          type={"true-false"}
          onTrue={() => router.push("/pedido/bebida")}
          onFalse={() => router.push("/pedido/informacoes-adicionais")}
        />
      )}
    </PedidoStyle>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const result = await getWorkingTime();
  const hoje = new Date()
    .toLocaleString("pt-BR", { weekday: "short" })
    .replace(".", "");

  const dia = result.find((x) => String(x.dia).startsWith(hoje));

  if (!!!dia.inicio) {
    return {
      props: {
        isWorking: false,
      },
    };
  }

  const dataInicio = new Date();
  dataInicio.getHours() < 5 && dataInicio.setDate(dataInicio.getDate() - 1);
  dataInicio.setHours(Number(dia.inicio.split(":")[0]) - 2);
  dataInicio.setMinutes(Number(dia.inicio.split(":")[1]));
  dataInicio.setSeconds(0);

  const dataFim = new Date();
  dataFim.getHours() < 5 && dataFim.setDate(dataFim.getDate() - 1);
  dataFim.setHours(Number(dia.fim.split(":")[0]));
  dataFim.setMinutes(Number(dia.fim.split(":")[1]) + 10);
  dataFim.setSeconds(0);

  const dataAtual = new Date();

  console.log(
    "working:",
    dataAtual < dataInicio || dataAtual > dataFim ? false : true
  );
  console.log(
    dataAtual.toLocaleString(),
    dataInicio.toLocaleString(),
    dataFim.toLocaleString()
  );
  return {
    props: {
      isWorking: true,
      // env.environment === "development"
      // ? true
      //     : dataAtual < dataInicio || dataAtual > dataFim
      // dataAtual < dataInicio || dataAtual > dataFim ? false : true,
    },
  };
};

export default Pedido;
