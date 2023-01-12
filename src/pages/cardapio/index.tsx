import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { PecaJaButton } from "../../components/pecaja";
import { CardapioStyle } from "../../styles/pages/cardapio/styles";
import PizzaImage from "../../assets/pages/home/pizza_1.png";
import { useNavigation } from "../../context/navigationContext";
import tamanhos from "../../data/tamanhos.json";
import sabores from "../../data/sabores.json";
import { useEffect } from "react";

const Cardapio: NextPage<{ left: []; right: [] }> = ({ left, right }) => {
  const getContent = (g) => (
    <div className="grupo">
      <h2 className="grupo-nome">{g.nome}</h2>
      <div className="grupo-sabores">
        {g.sabores.map((s) => (
          <div className="sabor">
            <h5 className="sabor-nome">{s.nome}</h5>
            <p className="sabor-ingredientes">{s.ingredientes.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <CardapioStyle>
      <aside className="left">{left.map((g) => getContent(g))}</aside>
      <aside className="right">{right.map((g) => getContent(g))}</aside>
    </CardapioStyle>
  );
};

export default Cardapio;

export const getStaticProps: GetStaticProps = async () => {
  const left = [];
  const right = [];

  sabores.grupos.forEach((g) => {
    sabores.grupos.indexOf(g) % 2 === 0 ? left.push(g) : right.push(g);
  });

  return {
    props: {
      left,
      right,
    },
  };
};
