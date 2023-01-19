import { GetStaticProps, NextPage } from "next";
import { CardapioStyle } from "../../styles/pages/cardapio/styles";
import { tamanhos } from "../../data/tamanhos.json";
import sabores from "../../data/sabores.json";
import { useState } from "react";
import { FlagEmojiToPNG } from "../../utitl/functions/conversion";
import { ICardapio, IGrupo } from "../../types/cardapio";
import { ISabor } from "../../types/item";
import { getValueString } from "../../utitl/functions/format";
import { Sabor } from "../../components/cardapio/sabor";

const Cardapio: NextPage<ICardapio> = ({ groupsLeft, groupsRight }) => {
  const getAllValues = (s: ISabor) => {
    return s.valores.map((v) => getValueString(v)).join(", ");
  };

  const getGroups = (g: IGrupo) => (
    <div className="group" key={g.nome}>
      <h2 className="group-name">{g.nome}</h2>
      <div className="group-flavours">
        {g.sabores.map((s) => (
          <Sabor
            key={s.nome}
            nome={s.nome}
            ingredientes={s.ingredientes}
            valuesString={getAllValues(s)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <CardapioStyle>
      <div className="groups">
        <aside className="groups-left">
          {groupsLeft.map((g) => getGroups(g))}
        </aside>
        <aside className="groups-right">
          {groupsRight.map((g) => getGroups(g))}
        </aside>
      </div>
    </CardapioStyle>
  );
};

export default Cardapio;

export const getStaticProps: GetStaticProps = async () => {
  const groupsLeft = [];
  const groupsRight = [];

  sabores.grupos.forEach((g) => {
    sabores.grupos.indexOf(g) % 2 === 0
      ? groupsLeft.push(g)
      : groupsRight.push(g);
  });

  return {
    props: {
      sizes: tamanhos,
      groupsLeft,
      groupsRight,
    },
  };
};
