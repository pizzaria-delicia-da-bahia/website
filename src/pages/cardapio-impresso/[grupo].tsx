import { GetServerSideProps, NextPage } from "next";
import { IPizzaGrupo, IPizzaTamanho } from "@models/pizza";
import { formatCurrency } from "@util/format";
import { Sabor } from "@components/cardapio/sabor";
import { env } from "@config/env";
import { CardapioImpressoStyle } from "@styles/pages/cardapio-impresso/styles";
import { Fragment } from "react";

export interface ICardapioImpresso {
  sizes: Array<IPizzaTamanho>;
  groups: IPizzaGrupo[];
}

const CardapioImpresso: NextPage<ICardapioImpresso> = ({ sizes, groups }) => {
  return (
    <CardapioImpressoStyle>
      {groups.map((group) => (
        <div className="grupo-sabores" key={group.id}>
          <h2 className="grupo">{group.nome}</h2>
          <div className="sabores">
            {group.sabores.map((s) => (
              <div className="sabor-valores" key={s.id}>
                <Sabor
                  className="sabor"
                  nome={s.nome}
                  ingredientes={s.ingredientes.map((i) =>
                    i === "Mussarela"
                      ? "Mussarela"
                      : i === "Orégano"
                      ? "Orég."
                      : i === "Calabresa"
                      ? "Calabresa"
                      : i === "Carne de Hambúrguer"
                      ? "Carne de Hambúrguer"
                      : i === "Peito de Peru"
                      ? "P. de Peru"
                      : i === "Requeijão"
                      ? "Requeijão"
                      : i === "Molho Especial"
                      ? "Molho Esp"
                      : i
                  )}
                  active={s.disponivel}
                  valuesString=""
                  forPrint
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </CardapioImpressoStyle>
  );
};

export default CardapioImpresso;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const sizes = ((await (
      await fetch(`${env.apiURL}/pizzas/tamanhos`)
    ).json()) ?? []) as IPizzaTamanho[];

    const groups = ((await (
      await fetch(
        `${env.apiURL}/pizzas/sabores?gruposProcurados=${ctx.query.grupo}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
    ).json()) ?? []) as IPizzaGrupo[];

    return {
      props: {
        sizes,
        groups,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        sizes: [],
        groups: [],
      },
    };
  }
};
