import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  createRef,
  FC,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMyOrder } from "../../../../context/myOrderContext";
import {
  ButtonBackForward,
  ButtonSecondary,
} from "../../../../styles/components/buttons";
import { TamanhoStyle } from "../../../../styles/pages/pedido/pizza/tamanho/styles";
import { tamanhos } from "../../../../data/tamanhos.json";
import { useRouter } from "next/router";
import Carousel from "../../../../components/carousel";
import CarouselItem from "../../../../components/carousel/carouselItem";

const BottomInfo: FC<{
  name: string;
  prop: string | number;
  description: string;
}> = ({ name, prop, description }) => (
  <div className={`bottom-info ${name}`}>
    <img src={`/images/tamanho-${name}.svg`} width={30} height={30} />
    <b>{prop}</b>
    <span>{description}</span>
  </div>
);

const Tamanho: NextPage = () => {
  const { myOrder } = useMyOrder();
  const router = useRouter();

  const getImageSize = (index) =>
    Math.ceil((100 / tamanhos.length) * (index + 1));
  return (
    <TamanhoStyle>
      <div className="text">
        <h1>TAMANHO</h1>
      </div>
      <div className="menu">
        <Carousel
          length={tamanhos.length}
          defaultSelectedIndex={tamanhos.length - 2}
        >
          {tamanhos.map((item, index) => (
            <CarouselItem
              key={item.nome}
              title={item.nome}
              image={{
                src: "/images/pedido-pizza.svg",
                w: getImageSize(index),
              }}
              index={index}
              route={`/pedido/pizza/sabores/${item.nome}`}
            >
              <BottomInfo
                prop={item.fatias}
                description="FATIAS"
                name="slices"
              />
              <BottomInfo
                prop={item.maxSabores}
                description={`SABOR${item.maxSabores > 1 ? "ES" : ""}`}
                name="flavours"
              />
              <BottomInfo
                prop={item.tamanhoAprox}
                description="CM"
                name="size"
              />
            </CarouselItem>
          ))}
        </Carousel>
      </div>
      <nav className="bottom-controls">
        <ButtonSecondary onClick={() => router.back()}>
          <p>VOLTAR</p>
        </ButtonSecondary>
      </nav>
    </TamanhoStyle>
  );
};

export default Tamanho;
