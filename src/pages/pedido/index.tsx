import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { createRef, ReactElement, useEffect, useRef, useState } from "react";
import { Badge } from "../../components/badge";
import Carousel from "../../components/carousel";
import CarouselItem from "../../components/carousel/carouselItem";
import { useMyOrder } from "../../context/myOrderContext";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../styles/components/buttons";
import { PedidoStyle } from "../../styles/pages/pedido/styles";

const Pedido: NextPage = () => {
  const items = [
    { name: "LANCHES", route: "lanche", image: "/images/pedido-lanche.svg" },
    {
      name: "PIZZAS",
      route: "pizza/tamanho",
      image: "/images/pedido-pizza.svg",
    },
    { name: "BEBIDAS", route: "bebida", image: "/images/pedido-bebida.svg" },
  ];
  const { myOrder } = useMyOrder();

  return (
    <PedidoStyle>
      <div className="text">
        <h1>MONTE SEU PEDIDO</h1>
        <h4>ADICIONE UM ITEM</h4>
      </div>
      <div className="menu">
        <Carousel length={items.length}>
          {items.map((item, index) => (
            <CarouselItem
              image={{ src: item.image, w: 100, h: 100 }}
              title={item.name}
              route={item.route}
              index={index}
            />
          ))}
        </Carousel>
      </div>
      <nav className="bottom-controls">
        <ButtonSecondary disabled={(myOrder?.items?.length ?? 0) < 1}>
          <p>MEUS ITENS</p>
          <Badge number={myOrder?.items?.length ?? 0} />
        </ButtonSecondary>
        <ButtonPrimary disabled={(myOrder?.items?.length ?? 0) < 1}>
          PEDIDO PRONTO!
        </ButtonPrimary>
      </nav>
    </PedidoStyle>
  );
};

export default Pedido;
