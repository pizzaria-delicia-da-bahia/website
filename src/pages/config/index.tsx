import { GetServerSideProps, NextPage } from "next";
import { IPizzaGrupo, IPizzaSabor, IPizzaTamanho } from "@models/pizza";
import { IOutro } from "@models/outro";
import { ConfigStyle } from "@styles/pages/config/styles";
import { useState } from "react";
import { Flavour } from "@components/config/flavour";
import { Size } from "@components/config/size";
import { Other } from "@components/config/other";
import { IEndereco } from "@models/endereco";
import { toast } from "react-toastify";
import { env } from "@config/env";
import { FloatButton } from "@styles/components/buttons";

// interface IConfig {
//   sabores: Array<IPizzaSabor>;
//   tamanhos: Array<IPizzaTamanho>;
//   bebidas: Array<IOutro>;
//   lanches: Array<IOutro>;
//   enderecos: Array<IEndereco>;
//   grupos: Array<IPizzaGrupo>;
// }

const Config: NextPage = () => {
  const [show, setShow] = useState<
    "flavours" | "sizes" | "drinks" | "snacks" | "addresses" | string
  >("flavours");

  const [showNew, setShowNew] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>(1);
  const [sabores, setSabores] = useState<IPizzaSabor[]>([]);
  const [saboresModificados, setSaboresModificados] = useState<IPizzaSabor[]>(
    []
  );
  const [tamanhos, setTamanhos] = useState<IPizzaTamanho[]>([]);
  const [tamanhosModificados, setTamanhosModificados] = useState<
    IPizzaTamanho[]
  >([]);
  const [bebidas, setBebidas] = useState<IOutro[]>([]);
  const [bebidasModificados, setBebidasModificados] = useState<IOutro[]>([]);
  const [lanches, setLanches] = useState<IOutro[]>([]);
  const [lanchesModificados, setLanchesModificados] = useState<IOutro[]>([]);
  const [grupos, setGrupos] = useState<IPizzaGrupo[]>([]);
  const [gruposModificados, setGruposModificados] = useState<IPizzaGrupo[]>([]);
  const [enderecos, setEnderecos] = useState<IEndereco[]>([]);
  const [enderecosModificados, setEnderecosModificados] = useState<IEndereco[]>(
    []
  );
  const [password, setPassword] = useState<string>("");
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
    valorMin: 0,
    nome: "",
    tamanhoAprox: 0,
    visivel: true,
  };

  const emptyOther: IOutro = {
    id: "",
    disponivel: true,
    imagemUrl: "",
    nome: "",
    vendidos: 0,
    visivel: true,
    valor: 0,
  };

  const getAuth = async () => {
    try {
      if (!password) throw new Error("Please, provide a password");

      const { status } = await fetch(`${env.apiURL}/auth`, {
        method: "POST",
        body: JSON.stringify({ pw: Buffer.from(password) }),
        headers: { "Content-Type": "application/json" },
      });

      if (status !== 200) throw new Error("Request failed");

      setSabores(
        (await (
          await fetch(`${env.apiURL}/pizzas/sabores?somenteSabores=true`, {
            headers: { "Content-Type": "application/json" },
          })
        ).json()) ?? []
      );

      setGrupos(
        (await (
          await fetch(`${env.apiURL}/pizzas/grupos`, {
            headers: { "Content-Type": "application/json" },
          })
        ).json()) ?? []
      );

      setTamanhos(
        (await (
          await fetch(`${env.apiURL}/pizzas/tamanhos`, {
            headers: { "Content-Type": "application/json" },
          })
        ).json()) ?? []
      );

      setBebidas(
        (await (
          await fetch(`${env.apiURL}/bebidas`, {
            headers: { "Content-Type": "application/json" },
          })
        ).json()) ?? []
      );

      setLanches(
        (await (
          await fetch(`${env.apiURL}/lanches`, {
            headers: { "Content-Type": "application/json" },
          })
        ).json()) ?? []
      );

      // const { enderecos } =
      //   (await (await fetch(`${env.apiURL}/enderecos`, {headers: { "Content-Type": "application/json" }})).json()) ?? [];

      toast("Bem vindo", { type: "success" });
      setIsAuth(true);
    } catch (err) {
      console.error((err as Error).message, (err as Error).stack);
      toast("Erro!", { type: "error" });
    } finally {
      setPassword("");
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
              api_url={env.apiURL}
              sabor={emptyFlavour}
              grupos={grupos}
              tamanhos={tamanhos}
            />
          ) : show === "sizes" ? (
            <Size api_url={env.apiURL} tamanho={emptySize} />
          ) : show === "drinks" ? (
            <Other api_url={`${env.apiURL}/bebidas`} item={emptyOther} />
          ) : show === "snacks" ? (
            <Other api_url={`${env.apiURL}/lanches`} item={emptyOther} />
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
              api_url={env.apiURL}
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
            <Size api_url={env.apiURL} tamanho={size} key={size.nome} />
          ))}
      </ul>

      <ul className={`drinks ${show !== "drinks" && "hidden"}`}>
        {bebidas.slice(pageCount - 1, pageCount + itemsPerPage - 1).map((i) => (
          <Other api_url={`${env.apiURL}/bebidas`} item={i} key={i.nome} />
        ))}
      </ul>

      <ul className={`snacks ${show !== "snacks" && "hidden"}`}>
        {lanches.slice(pageCount - 1, pageCount + itemsPerPage - 1).map((i) => (
          <Other api_url={`${env.apiURL}/lanches`} item={i} key={i.nome} />
        ))}
      </ul>

      {/* <ul className={`addresses ${show !== "addresses" && "hidden"}`}>
        {enderecos
          .slice(pageCount - 1, pageCount + itemsPerPage - 1)
          .map((i) => (
            <Address
              api_url={`${env.apiURL}/enderecos`}
              endereco={i}
              key={i.cep}
            />
          ))}
      </ul> */}
      <FloatButton>Salvar</FloatButton>
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
        ❌ Insira sua senha para acessar esta página ❌
      </h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            getAuth();
          }
        }}
        placeholder="password"
      />
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   if (!(ctx.query.isauth === "true")) {
//     ctx.res.destroy();
//   } else {
//     ctx.res.destroy();

//   }
// };
