import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { createRef, ReactElement, useEffect, useRef, useState } from "react";
import { useMyOrder } from "../../../../context/myOrderContext";
import {
  ButtonBackForward,
  ButtonSecondary,
} from "../../../../styles/components/buttons";
import { TamanhoStyle } from "../../../../styles/pages/pedido/pizza/tamanho/styles";
import tamanhos from "../../../../data/tamanhos.json";
import { useRouter } from "next/router";
import Carousel from "../../../../components/carousel";
import CarouselItem from "../../../../components/carousel/carouselItem";
const Tamanho: NextPage = () => {
  const { myOrder } = useMyOrder();
  const router = useRouter();

  const getImageSize = (index) =>
    Math.ceil((100 / tamanhos.tamanhos.length) * (index + 1));
  return (
    <TamanhoStyle>
      <div className="text">
        <h1>TAMANHO</h1>
      </div>
      <div className="menu">
        <Carousel
          length={tamanhos.tamanhos.length}
          defaultSelectedIndex={tamanhos.tamanhos.length - 2}
        >
          {tamanhos.tamanhos.map((item, index) => (
            <CarouselItem
              key={item.nome}
              title={item.nome}
              image={{
                src: "/images/pedido-pizza.svg",
                w: getImageSize(index),
              }}
              index={index}
              route={`/pedido/pizza/${item.nome}`}
            >
              <div className="bottom-info slices">
                <Image
                  src="/images/tamanho-slices.svg"
                  width={30}
                  height={30}
                />
                <b>{item.fatias}</b>
                <span>FATIAS</span>
              </div>
              <div className="bottom-info flavours">
                <Image
                  src="/images/tamanho-flavours.svg"
                  width={30}
                  height={30}
                />
                <b>{item.maxSabores}</b>
                <span>{`SABOR${item.maxSabores > 1 ? "ES" : ""}`}</span>
              </div>
              <div className="bottom-info size">
                <Image src="/images/tamanho-size.svg" width={30} height={30} />
                <b>{item.tamanhoAprox}</b>
                <span>CM</span>
              </div>
            </CarouselItem>
          ))}
        </Carousel>
        {/* <ul className="menu-items">
          {tamanhos.tamanhos.map((item, index) => (
            <Link
              href={`/pedido/pizza/sabores&tamanho=${item.nome.toLowerCase()}`}
              passHref
              key={item.nome}
            >
              <li
                className={`item ${getSelected(index)} ${getPosition(index)}`}
                ref={(ref) => (scrollRef.current[item.nome] = ref)}
                onMouseEnter={() => setSelected(index)}
              >
                <Image
                  src={"/images/pedido-pizza.svg"}
                  width={Math.ceil(
                    (100 / tamanhos.tamanhos.length) * (index + 1)
                  )}
                  height={Math.ceil(
                    (100 / tamanhos.tamanhos.length) * (index + 1)
                  )}
                  alt=""
                />
                <h2>{item.nome}</h2>
              </li>
            </Link>
          ))}
        </ul> */}
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
