import { GetServerSideProps, NextPage } from "next";
import { FC } from "react";
import { ButtonSecondary } from "../../../../styles/components/buttons";
import { TamanhoStyle } from "../../../../styles/pages/pedido/pizza/tamanho/styles";
import { useRouter } from "next/router";
import Carousel from "../../../../components/carousel";
import CarouselItem from "../../../../components/carousel/carouselItem";
import { ITamanho } from "../../../../types/item";

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

const Tamanho: NextPage<{ sizes: Array<ITamanho> }> = ({ sizes }) => {
  const router = useRouter();

  const getImageSize = (index) => Math.ceil((100 / sizes.length) * (index + 1));
  return (
    <TamanhoStyle>
      <div className="text">
        <h1>TAMANHO</h1>
      </div>
      <div className="menu">
        <Carousel length={sizes.length} defaultSelectedIndex={sizes.length - 2}>
          {sizes.map((item, index) => (
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { tamanhos } = await (
    await fetch(`${process.env.API_URL}/pizzas/tamanhos`)
  ).json();

  return {
    props: {
      sizes: tamanhos.filter((x) => x.visivel),
    },
  };
};
