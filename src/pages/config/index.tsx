import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { CardapioStyle } from "../../styles/pages/cardapio/styles";
import { ICardapio, IGrupo } from "../../types/cardapio";
import { IBebidaOutro, ISabor, ITamanho } from "../../types/item";
import { getValueString } from "../../utitl/functions/format";
import { Sabor } from "../../components/cardapio/sabor";
import { ConfigStyle } from "../../styles/pages/config/styles";
import { IAddress } from "../../types/order";
import { useState } from "react";
import { Flavour } from "../../components/config/flavour";
import { Size } from "../../components/config/size";
import { Other } from "../../components/config/other";

interface IConfig {
  sabores: Array<ISabor>;
  tamanhos: Array<ITamanho>;
  bebidas: Array<IBebidaOutro>;
  lanches: Array<IBebidaOutro>;
  enderecos: Array<IAddress>;
  grupos: Array<string>;
  api_url: string;
}

const Config: NextPage<IConfig> = ({
  sabores,
  tamanhos,
  bebidas,
  lanches,
  grupos,
  enderecos,
  api_url,
}) => {
  const [show, setShow] = useState<
    "flavours" | "sizes" | "drinks" | "snacks" | "addresses" | string
  >("flavours");

  const [showNew, setShowNew] = useState<boolean>(false);

  const emptyFlavour: ISabor = {
    disponivel: true,
    ingredientes: [],
    nome: "",
    valores: tamanhos.map((t) => ({ tamanho: t.nome, valor: 0 })),
  };

  const emptySize: ITamanho = {
    fatias: 0,
    maxSabores: 0,
    nome: "",
    tamanhoAprox: 0,
    visivel: true,
  };

  const emptyOther: IBebidaOutro = {
    disponivel: true,
    imagemUrl: "",
    nome: "",
    valor: 0,
  };

  console.log(grupos);
  return (
    <ConfigStyle>
      <div className="controller">
        <label>Mostrar:</label>
        <select value={show} onChange={(e) => setShow(e.target.value)}>
          <option value={"flavours"}>SABORES</option>
          <option value={"sizes"}>TAMANHOS</option>
          <option value={"drinks"}>BEBIDAS</option>
          <option value={"snacks"}>LANCHES</option>
          <option value={"addresses"}>ENDEREÇOS</option>
        </select>
        <input
          type="checkbox"
          id="show-new"
          style={{ appearance: "button" }}
          checked={showNew}
          onChange={(e) => setShowNew(e.target.checked)}
        />
      </div>
      {showNew && (
        <div className="new">
          {show === "flavours" ? (
            <Flavour api_url={api_url} sabor={emptyFlavour} grupos={grupos} />
          ) : show === "sizes" ? (
            <Size api_url={api_url} tamanho={emptySize} />
          ) : show === "drinks" ? (
            <Other api_url={`${api_url}/bebidas`} item={emptyOther} />
          ) : show === "snacks" ? (
            <Other api_url={`${api_url}/lanches`} item={emptyOther} />
          ) : (
            <></>
          )}
        </div>
      )}
      <ul className={`flavours ${show !== "flavours" && "hidden"}`}>
        {sabores.map((sabor) => (
          <Flavour api_url={api_url} sabor={sabor} key={sabor.nome} />
        ))}
      </ul>

      <ul className={`sizes ${show !== "sizes" && "hidden"}`}>
        {tamanhos.map((size) => (
          <Size api_url={api_url} tamanho={size} key={size.nome} />
        ))}
      </ul>

      <ul className={`drinks ${show !== "drinks" && "hidden"}`}>
        {bebidas.map((i) => (
          <Other api_url={`${api_url}/bebidas`} item={i} key={i.nome} />
        ))}
      </ul>

      <ul className={`snacks ${show !== "snacks" && "hidden"}`}>
        {lanches.map((i) => (
          <Other api_url={`${api_url}/lanches`} item={i} key={i.nome} />
        ))}
      </ul>
    </ConfigStyle>
  );
};

export default Config;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(ctx.query.isauth === "true")) {
    ctx.res.destroy();
  } else {
    const { grupos } =
      (await (await fetch(`${process.env.API_URL}/pizzas/sabores`)).json()) ??
      [];

    const { tamanhos } =
      (await (await fetch(`${process.env.API_URL}/pizzas/tamanhos`)).json()) ??
      [];

    const { bebidas } =
      (await (await fetch(`${process.env.API_URL}/bebidas`)).json()) ?? [];

    const { lanches } =
      (await (await fetch(`${process.env.API_URL}/lanches`)).json()) ?? [];

    // const { enderecos } =
    //   (await (await fetch(`${process.env.API_URL}/enderecos`)).json()) ?? [];
    return {
      props: {
        sabores: grupos.length > 0 ? grupos.map((g) => g.sabores).flat() : [],
        grupos: grupos.map((g) => g.nome),
        tamanhos,
        bebidas,
        lanches,
        enderecos: [],
        api_url: process.env.API_URL,
      },
    };
  }
};
