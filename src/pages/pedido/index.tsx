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
              key={item.name}
              image={{ src: item.image, w: 100 }}
              title={item.name}
              route={item.route}
              index={index}
            />
          ))}
        </Carousel>
      </div>
      <nav className="bottom-controls">
        <Link href={"/pedido/itens"} passHref>
          <ButtonSecondary disabled={(myOrder?.items?.length ?? 0) < 1}>
            <p>MEUS ITENS</p>
            <Badge number={myOrder?.items?.length ?? 0} />
          </ButtonSecondary>
        </Link>
        <Link href="/pedido/informacoes-adicionais" passHref>
          <ButtonPrimary disabled={(myOrder?.items?.length ?? 0) < 1}>
            PEDIDO PRONTO!
          </ButtonPrimary>
        </Link>
      </nav>
    </PedidoStyle>
  );
};

export default Pedido;
