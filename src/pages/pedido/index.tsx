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
import { useEffect, useState } from "react";
import Modal from "@components/modal";
import { ButtonPrimary, ButtonSecondary } from "@styles/components/buttons";

const isWorking = true;
const Pedido: NextPage = () => {
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
    // {
    //   name: "",
    //   route: "pedido/promocao-relampago",
    //   image: "/images/promocao.svg",
    // },
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

  useEffect(() => {
    if (myOrder?.id) {
      router.push("/pedido/confirmacao");
    }
  }, [myOrder]);

  return (
    <PedidoStyle
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <TextContainer title="MONTE SEU PEDIDO" subtitle="ADICIONE UM ITEM" />

      <div className="menu">
        <Carousel length={items.length}>
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
                ["CERVEJA", "SUCO", "REFRIGERANTE", "ÁGUA"].some((y) =>
                  (x as IOutro)?.nome?.toUpperCase().includes(y)
                )
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
          label="Adicionar bebida?"
          type={"custom"}
          buttons={
            <>
              <ButtonSecondary
                onClick={() => {
                  router.push("/pedido/informacoes-adicionais");
                }}
              >
                Não quero bebida
              </ButtonSecondary>

              <ButtonPrimary
                onClick={() => {
                  router.push("/pedido/bebida");
                }}
              >
                Adicionar bebida
              </ButtonPrimary>
            </>
          }
        />
      )}
    </PedidoStyle>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const result = await getWorkingTime();
//   const hoje = new Date()
//     .toLocaleString("pt-BR", { weekday: "short" })
//     .replace(".", "");

//   const dia = result.find((x) => String(x.dia).startsWith(hoje));

//   if (!!!dia.inicio) {
//     return {
//       props: {
//         isWorking: true,
//       },
//     };
//   }

//   const dataInicio = new Date();
//   dataInicio.getHours() < 5 && dataInicio.setDate(dataInicio.getDate() - 1);
//   dataInicio.setHours(Number(dia.inicio.split(":")[0]) - 2);
//   dataInicio.setMinutes(Number(dia.inicio.split(":")[1]));
//   dataInicio.setSeconds(0);

//   const dataFim = new Date();
//   dataFim.getHours() < 5 && dataFim.setDate(dataFim.getDate() - 1);
//   dataFim.setHours(Number(dia.fim.split(":")[0]));
//   dataFim.setMinutes(Number(dia.fim.split(":")[1]) + 10);
//   dataFim.setSeconds(0);

//   const dataAtual = new Date();

//   console.log(
//     "working:",
//     dataAtual < dataInicio || dataAtual > dataFim ? false : true
//   );
//   console.log(
//     "atual",
//     dataAtual.toLocaleString(),
//     "inicio",
//     dataInicio.toLocaleString(),
//     "fim",
//     dataFim.toLocaleString()
//   );
//   return {
//     props: {
//       isWorking: true,
//       // env.environment === "development"
//       // ? true
//       //     : dataAtual < dataInicio || dataAtual > dataFim
//       // dataAtual < dataInicio || dataAtual > dataFim ? false : true,
//     },
//   };
// };

export default Pedido;
