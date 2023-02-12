import { GetServerSideProps, NextPage } from "next";
import { createRef, FC, useEffect, useState } from "react";
import { ButtonSecondary } from "../../../../styles/components/buttons";
import { TamanhoStyle } from "../../../../styles/pages/pedido/pizza/tamanho/styles";
import { useRouter } from "next/router";
import Carousel from "../../../../components/carousel";
import CarouselItem from "../../../../components/carousel/carouselItem";
import { IPizzaTamanho } from "../../../../types/pizza";
import Loading from "../../../../components/loading";

const BottomInfo: FC<{
  name: string;
  prop: string | number;
  description: string;
}> = ({ name, prop, description }) => (
  <div className={`bottom-info ${name}`}>
    <img src={`/images/tamanho-${name}.svg`} width={30} height={30} />
    <b className="value">{prop}</b>
    <span className="description">{description}</span>
  </div>
);

const Tamanho: NextPage = () => {
  const router = useRouter();

  const [sizes, setSizes] = useState<IPizzaTamanho[]>([]);

  const loadSizes = async () => {
    try {
      const tamanhos = (await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pizzas/tamanhos`)
      ).json()) as IPizzaTamanho[];
      setSizes(tamanhos.filter((x) => x.visivel));
    } catch (err) {
      console.error((err as Error).message, (err as Error).stack);
    }
  };

  useEffect(() => {
    loadSizes();
  }, []);

  useEffect(() => {
    if (sizes.length) {
      document.querySelector(".selected.selected").scrollIntoView();
    }
  }, [sizes]);

  const getImageSize = (index) => Math.ceil((60 / sizes.length) * (index + 1));
  return (
    <TamanhoStyle>
      {sizes.length > 0 ? (
        <>
          <div className="text">
            <h1>TAMANHO</h1>
          </div>
          <div className="menu">
            <Carousel
              length={sizes.length}
              defaultSelectedIndex={sizes.length - 2}
            >
              {sizes.map((item, index) => (
                <CarouselItem
                  key={item.nome}
                  title={item.nome}
                  image={{
                    src: "/images/pedido-pizza.svg",
                    w: getImageSize(index),
                  }}
                  index={index}
                  route={`/pedido/pizza/sabores/${item.id}`}
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
        </>
      ) : (
        <Loading />
      )}
    </TamanhoStyle>
  );
};

export default Tamanho;
