import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { PecaJaButton } from "../../components/pecaja";
import { CardapioStyle } from "../../styles/pages/cardapio/styles";
import PizzaImage from "../../assets/pages/home/pizza_1.png";
import { useNavigation } from "../../context/navigationContext";
import tamanhos from "../../data/tamanhos.json";
import sabores from "../../data/sabores.json";
import { useEffect, useState } from "react";
import Select from "react-select";
import ReactSelect from "react-select";

interface ITamanho {
  nome: string;
  fatias: number;
  tamanhoAprox: number;
  visivel: boolean;
}
interface IValor {
  tamanho: string;
  valor: number;
}
interface ISabor {
  nome: string;
  ativo: boolean;
  ingredientes: Array<string>;
  valores: Array<IValor>;
}

interface ICardapio {
  sizes: Array<ITamanho>;
  groupsLeft: Array<ISabor>;
  groupsRight: Array<ISabor>;
}

interface IGrupo {
  nome: string;
  sabores: Array<ISabor>;
}

const FlagemojiToPNG = (flag: string) => {
  var reg = /[\uD83C][\uDDE6-\uDDFF][\uD83C][\uDDE6-\uDDFF]/;
  if (reg.test(flag)) {
    var countryCode = Array.from(flag, (codeUnit: any) =>
      codeUnit.codePointAt()
    )
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  } else {
    return flag;
  }
};

const Cardapio: NextPage<ICardapio> = ({ sizes, groupsLeft, groupsRight }) => {
  const [currentSize, setCurrentSize] = useState(null);

  const getAllValues = (s: ISabor) => {
    const getValueString = (v) =>
      `${v.tamanho}: ${Number(v.valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`;

    return currentSize
      ? getValueString(s.valores.find((x) => x.tamanho === currentSize))
      : s.valores.map((v) => getValueString(v)).join(", ");
  };
  const getGroups = (g: IGrupo) => (
    <div className="group" key={g.nome}>
      <h2 className="group-name">{g.nome}</h2>
      <div className="group-flavours">
        {g.sabores.map((s) => (
          <div className="flavour" key={s.nome}>
            <p className="flavour-name">
              <h5>{`${s.nome.split(" ").slice(0, -1).join(" ")}`}</h5>
              <h5>{FlagemojiToPNG(s.nome.split(" ").pop())}</h5>
            </p>
            <p className="flavour-ingredients">{s.ingredientes.join(", ")}</p>
            <p className="flavour-values">{getAllValues(s)}</p>
          </div>
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
      sizes: tamanhos.tamanhos,
      groupsLeft,
      groupsRight,
    },
  };
};
