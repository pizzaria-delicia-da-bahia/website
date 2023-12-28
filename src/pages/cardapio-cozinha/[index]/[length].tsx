import { GetServerSideProps, NextPage } from "next";
import { IPizzaSabor } from "@models/pizza";
import { Sabor } from "@components/cardapio/sabor";
import { env } from "@config/env";
import { CardapioCozinhaStyle } from "@styles/pages/cardapio-cozinha/styles";

export interface ICardapioImpresso {
  index: number;
  flavours: IPizzaSabor[];
}

const CardapioCozinha: NextPage<ICardapioImpresso> = ({ index, flavours }) => {
  return (
    <CardapioCozinhaStyle>
      <div className="sabores">
        {flavours.map((s, i) => (
          <Sabor
            className="sabor"
            key={s.id}
            nome={`${i + index + 1}º - ${s.nome}`}
            ingredientes={s.ingredientes
              .filter((x) =>
                s.ingredientes.length > 2 ? !["Mussarela"].includes(x) : true
              )
              .map((i) =>
                i === "Mussarela"
                  ? "Muss."
                  : i === "Orégano"
                  ? "Orég."
                  : i === "Calabresa"
                  ? "Calab."
                  : i === "Carne de Hambúrguer"
                  ? "Carne Hb."
                  : i === "Peito de Peru"
                  ? "P.Peru"
                  : i === "Requeijão"
                  ? "Reqj."
                  : i === "Molho Especial"
                  ? "Molho Esp."
                  : i === "Uva Passas"
                  ? "Passas"
                  : i === "Presunto"
                  ? "Pres."
                  : i === "Carne do Sol"
                  ? "C.Sol"
                  : i === "Carne de Sertão"
                  ? "C.Sert."
                  : i === "Creme de Leite"
                  ? "C.Leite"
                  : i === "Leite Condensado"
                  ? "Leite Cond."
                  : i === "Gorgonzola"
                  ? "Gorgon."
                  : i === "Barbecue"
                  ? "Barbq."
                  : i === "Parmesão"
                  ? "Parme."
                  : i === "Chocolate"
                  ? "Choco."
                  : i
              )}
            active={s.disponivel}
            valuesString=""
            forPrint
          />
        ))}
      </div>
    </CardapioCozinhaStyle>
  );
};

export default CardapioCozinha;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const flavours = ((await (
      await fetch(
        `${env.apiURL}/pizzas/sabores?index=${ctx.query.index}&length=${ctx.query.length}&somenteSabores=true`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
    ).json()) ?? []) as IPizzaSabor[];

    return {
      props: {
        flavours,
        index: Number(ctx.query.index),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        flavours: [],
      },
    };
  }
};
