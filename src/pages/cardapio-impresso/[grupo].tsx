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
        <Fragment key={group.id}>
          <h2 className="grupo">{group.nome}</h2>
          <div className="sabores">
            <div className="sabor-valores">
              <p className="sabor">Sabor</p>
              <div className="valores">
                {sizes
                  .filter((x) => x.visivel)
                  .map((s) => (
                    <li className="valor" key={s.id}>
                      {s.nome.slice(0, 3)}
                    </li>
                  ))}
              </div>
            </div>

            {group.sabores.map((s) => (
              <div className="sabor-valores" key={s.id}>
                <Sabor
                  className="sabor"
                  nome={s.nome}
                  ingredientes={s.ingredientes.map((i) =>
                    i === "Mussarela"
                      ? "Muss."
                      : i === "Orégano"
                      ? "Orég."
                      : i === "Calabresa"
                      ? "Calab."
                      : i === "Carne de Hambúrguer"
                      ? "Carne de Hb."
                      : i === "Peito"
                      ? "P."
                      : i === "Requeijão"
                      ? "Reqj."
                      : i === "Molho Especial"
                      ? "Molho Esp."
                      : i
                  )}
                  active={s.disponivel}
                  valuesString=""
                  forPrint
                />
                <div className="valores">
                  {s.valores
                    .filter(
                      (x) => sizes.find((s) => x.tamanhoId === s.id).visivel
                    )
                    .map((v) => (
                      <li className="valor" key={s.id + v.tamanhoId}>
                        {formatCurrency(v.valor)}
                      </li>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Fragment>
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

    console.log(ctx.query.grupo);
    const groups = ((await (
      await fetch(
        `${env.apiURL}/pizzas/sabores?gruposProcurados=${ctx.query.grupo}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
    ).json()) ?? []) as IPizzaGrupo[];

    console.log(JSON.stringify(groups, null, " "));

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
