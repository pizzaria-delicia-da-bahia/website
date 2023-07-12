import { GetServerSideProps, NextPage } from "next";
import { IPizzaGrupo, IPizzaTamanho } from "@models/pizza";
import { formatCurrency } from "@util/format";
import { Sabor } from "@components/cardapio/sabor";
import { env } from "@config/env";
import { CardapioOficioStyle } from "@styles/pages/cardapio-oficio/styles";
import { Fragment } from "react";

export interface ICardapioOficio {
  sizes: Array<IPizzaTamanho>;
  groups: IPizzaGrupo[];
}

const CardapioOficio: NextPage<ICardapioOficio> = ({ sizes, groups }) => {
  return (
    <CardapioOficioStyle>
      <div className="espaco-tamanhos">
        <div className="espaco"></div>
        <ul className="tamanhos">
          {sizes
            .filter((x) => x.visivel)
            .map((size) => (
              <li className="tamanho" key={size.id}>
                {size.nome.slice(0, 3).toUpperCase()}
              </li>
            ))}
        </ul>
      </div>
      {groups.map((group) => (
        <Fragment key={group.id}>
          <h2 className="grupo">{group.nome}</h2>
          <div className="sabores">
            {group.sabores.map((s) => (
              <div className="sabor-valores" key={s.id}>
                <Sabor
                  className="sabor"
                  nome={s.nome}
                  ingredientesDoLado={true}
                  ingredientes={s.ingredientes.map((i) =>
                    i === "Mussarela"
                      ? "Mussar."
                      : i === "Orégano"
                      ? "Orég."
                      : i === "Calabresa"
                      ? "Calabr."
                      : i === "Carne de Hambúrguer"
                      ? "Carne de Hamb."
                      : i === "Peito de Peru"
                      ? "P. de Peru"
                      : i === "Requeijão"
                      ? "Requeij."
                      : i === "Molho Especial"
                      ? "Molho Esp"
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
    </CardapioOficioStyle>
  );
};

export default CardapioOficio;

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
