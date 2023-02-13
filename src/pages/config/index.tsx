import { GetServerSideProps, NextPage } from "next";
import { IPizzaGrupo, IPizzaSabor, IPizzaTamanho } from "../../types/pizza";
import { IOutro } from "../../types/outro";
import { ConfigStyle } from "../../styles/pages/config/styles";
import { useState } from "react";
import { Flavour } from "../../components/config/flavour";
import { Size } from "../../components/config/size";
import { Other } from "../../components/config/other";
import { IEndereco } from "../../types/endereco";
import { toast } from "react-toastify";

interface IConfig {
  sabores: Array<IPizzaSabor>;
  tamanhos: Array<IPizzaTamanho>;
  bebidas: Array<IOutro>;
  lanches: Array<IOutro>;
  enderecos: Array<IEndereco>;
  grupos: Array<IPizzaGrupo>;
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
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>(1);
  const itemsPerPage = 12;

  const emptyFlavour: IPizzaSabor = {
    id: "",
    grupoId: "",
    disponivel: true,
    ingredientes: [],
    nome: "",
    valores: tamanhos.map((t) => ({ tamanhoId: t.id, valor: 0 })),
  };

  const emptySize: IPizzaTamanho = {
    id: "",
    fatias: 0,
    maxSabores: 0,
    nome: "",
    tamanhoAprox: 0,
    visivel: true,
  };

  const emptyOther: IOutro = {
    id: "",
    disponivel: true,
    imagemUrl: "",
    nome: "",
    valor: 0,
  };

  const getAuth = async () => {
    try {
      const pw = window.prompt("Insira a senha de acesso:", "");
      if (pw) {
        const response = await fetch(`${api_url}/auth`, {
          method: "POST",
          body: JSON.stringify({ pw: Buffer.from(pw) }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          toast("Bem vindo", { type: "success" });
          setIsAuth(true);
        }
      }
    } catch (err) {
      console.error((err as Error).message, (err as Error).stack);
    }
  };

  return isAuth ? (
    <ConfigStyle>
      <div className="controller">
        <label>Mostrar:</label>
        <select
          value={show}
          onChange={(e) => {
            setShow(e.target.value);
            setPageCount(1);
          }}
        >
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
            <Flavour
              api_url={api_url}
              sabor={emptyFlavour}
              grupos={grupos}
              tamanhos={tamanhos}
            />
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
      <div className="page-control">
        <button
          type="button"
          disabled={pageCount <= 1}
          onClick={() =>
            setPageCount((prev) => {
              return prev - itemsPerPage;
            })
          }
        >
          {"<"}
        </button>
        <button
          disabled={
            (show === "flavours" &&
              pageCount + itemsPerPage > sabores.length) ||
            (show === "sizes" && pageCount + itemsPerPage > tamanhos.length) ||
            (show === "drinks" && pageCount + itemsPerPage > bebidas.length) ||
            (show === "snacks" && pageCount + itemsPerPage > lanches.length) ||
            (show === "addresses" &&
              pageCount + itemsPerPage > enderecos.length)
          }
          type="button"
          onClick={() => setPageCount((prev) => prev - 1 + itemsPerPage + 1)}
        >
          {">"}
        </button>
      </div>
      <ul className={`flavours ${show !== "flavours" && "hidden"}`}>
        {sabores
          .slice(pageCount - 1, pageCount + itemsPerPage - 1)
          .map((sabor) => (
            <Flavour
              api_url={api_url}
              sabor={sabor}
              grupos={grupos}
              key={sabor.nome}
              tamanhos={tamanhos}
            />
          ))}
      </ul>

      <ul className={`sizes ${show !== "sizes" && "hidden"}`}>
        {tamanhos
          .slice(pageCount - 1, pageCount + itemsPerPage - 1)
          .map((size) => (
            <Size api_url={api_url} tamanho={size} key={size.nome} />
          ))}
      </ul>

      <ul className={`drinks ${show !== "drinks" && "hidden"}`}>
        {bebidas.slice(pageCount - 1, pageCount + itemsPerPage - 1).map((i) => (
          <Other api_url={`${api_url}/bebidas`} item={i} key={i.nome} />
        ))}
      </ul>

      <ul className={`snacks ${show !== "snacks" && "hidden"}`}>
        {lanches.slice(pageCount - 1, pageCount + itemsPerPage - 1).map((i) => (
          <Other api_url={`${api_url}/lanches`} item={i} key={i.nome} />
        ))}
      </ul>

      {/* <ul className={`addresses ${show !== "addresses" && "hidden"}`}>
        {enderecos
          .slice(pageCount - 1, pageCount + itemsPerPage - 1)
          .map((i) => (
            <Address
              api_url={`${api_url}/enderecos`}
              endereco={i}
              key={i.cep}
            />
          ))}
      </ul> */}
    </ConfigStyle>
  ) : (
    <ConfigStyle
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        ❌ Você não tem permissão para visualizar esta página ❌
      </h1>
      <button
        style={{
          height: 50,
          width: 250,
          padding: "10px",
          fontSize: "1.2rem",
        }}
        type="button"
        onClick={getAuth}
      >
        Entrar
      </button>
    </ConfigStyle>
  );
};

export default Config;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(ctx.query.isauth === "true")) {
    ctx.res.destroy();
  } else {
    try {
      const sabores =
        (await (
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/pizzas/sabores?strict=true`
          )
        ).json()) ?? [];

      const grupos =
        (await (
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pizzas/grupos`)
        ).json()) ?? [];

      const tamanhos =
        (await (
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pizzas/tamanhos`)
        ).json()) ?? [];

      const bebidas =
        (await (
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bebidas`)
        ).json()) ?? [];

      const lanches =
        (await (
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lanches`)
        ).json()) ?? [];

      // const { enderecos } =
      //   (await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enderecos`)).json()) ?? [];
      return {
        props: {
          sabores,
          grupos,
          tamanhos,
          bebidas,
          lanches,
          enderecos: [],
          api_url: process.env.NEXT_PUBLIC_API_URL,
        },
      };
    } catch (err) {
      console.error((err as Error).message, (err as Error).stack);
      ctx.res.destroy();
    }
  }
};
