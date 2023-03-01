import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { createRef, ReactElement, useEffect, useRef, useState } from "react";
import { Badge } from "@components/badge";
import Carousel from "@components/carousel";
import CarouselItem from "@components/carousel/carouselItem";
import { useMyOrder } from "@context/myOrderContext";
import { ButtonPrimary, ButtonSecondary } from "@styles/components/buttons";
import { PedidoStyle } from "@styles/pages/pedido/styles";
import TextContainer from "@components/textContainer";
import BottomControls from "@components/pedido/bottomControls";

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
    {
      name: "BEBIDAS",
      route: "pedido/bebida",
      image: "/images/pedido-bebida.svg",
    },
  ];
  const { myOrder } = useMyOrder();
  const router = useRouter();

  return (
    <PedidoStyle>
      <TextContainer title="MONTE SEU PEDIDO" subtitle="ADICIONE UM ITEM" />

      <div className="menu">
        <Carousel length={items.length}>
          {items.map((item, index) => (
            <CarouselItem
              key={item.name}
              image={{ src: item.image, w: 100 }}
              title={item.name}
              route={item.route}
              index={index}
            />
          ))}
        </Carousel>
      </div>
      <BottomControls
        secondaryButton={{
          click: () => router.push("/pedido/itens"),
          disabled: (myOrder?.itens?.length ?? 0) < 1,
          text: "MEUS ITENS",
          badge: myOrder?.itens?.length,
        }}
        primaryButton={{
          click: () => router.push("/pedido/informacoes-adicionais"),
          disabled: (myOrder?.itens?.length ?? 0) < 1,
        }}
      />
    </PedidoStyle>
  );
};

export default Pedido;
