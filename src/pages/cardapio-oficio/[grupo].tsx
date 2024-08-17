import { GetServerSideProps, NextPage } from "next";
import { IPizzaGrupo, IPizzaTamanho } from "@models/pizza";
import { capitalize, formatCurrency } from "@util/format";
import { Sabor } from "@components/cardapio/sabor";
import { env } from "@config/env";
import {
  CardapioOficioStyle,
  SizesStyle,
} from "@styles/pages/cardapio-oficio/styles";
import { Fragment } from "react";

export interface ICardapioOficio {
  sizes: Array<IPizzaTamanho>;
  groups: IPizzaGrupo[];
}

const CardapioOficio: NextPage<ICardapioOficio> = ({ sizes, groups }) => {
  const _groupsAll = groups.sort((a, b) => {
    const contain = (name: string) => a.nome.toLowerCase().includes(name);

    if (contain("trad")) return 0;
    if (contain("sem")) return 1;
    if (contain("esp")) return 2;
    if (contain("doce")) {
      console.log(a);
      return 3;
    }
    if (contain("gour")) return 4;
  });

  const groupss = [_groupsAll.slice(0, 2), _groupsAll.slice(2)];
  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
    >
      <SizesStyle className="sizes">
        {sizes.map((size, i) => (
          <li>
            <aside>
              <h3 className="nome">
                {i + 1} - {capitalize(size.nome)}
              </h3>
              <p className="descricao">
                {size.fatias} fat • {size.maxSabores} sab • {size.tamanhoAprox}
                cm
              </p>
            </aside>
            <aside>
              <p className="apartir">À partir de:</p>
              <h2 className="valor">
                {formatCurrency(size.valorMin).replace(",00", "")}
              </h2>
            </aside>
          </li>
        ))}
      </SizesStyle>
      <CardapioOficioStyle>
        {groupss.map((groupsSide) => (
          <aside>
            {groupsSide.map((group) => (
              <div className="grupo-sabores" key={group.id}>
                <h3 className="grupo">{group.nome}</h3>
                <div className="sabores">
                  {group.sabores.map((s) => (
                    <div className="sabor-valores" key={s.id}>
                      <Sabor
                        className="sabor"
                        nome={s.nome}
                        ingredientesDoLado={true}
                        ingredientes={s.ingredientes.map((i) =>
                          i === "Mussarela"
                            ? "Muss"
                            : i === "Orégano"
                            ? "Orég"
                            : i === "Calabresa"
                            ? "Calab"
                            : i === "Carne de Hambúrguer"
                            ? "Carne Hb"
                            : i === "Carne de Sertão"
                            ? "C Sertão"
                            : i === "Carne do Sol"
                            ? "C Sol"
                            : i === "Uva Passas"
                            ? "Passas"
                            : i === "Presunto"
                            ? "Pres"
                            : i === "Peito de Peru"
                            ? "P Peru"
                            : i === "Requeijão"
                            ? "Reqj"
                            : i === "Molho Especial"
                            ? "Molho Esp"
                            : i === "Coco Ralado"
                            ? "Côco Ral"
                            : i === "Parmesão"
                            ? "Parmes"
                            : i === "Gorgonzola"
                            ? "Gorgon"
                            : i === "Leite Condensado"
                            ? "L Condens"
                            : i === "Creme de Leite"
                            ? "C Leite"
                            : i
                        )}
                        active={s.disponivel}
                        valuesString=""
                        forPrint
                      />
                      <div className="valores">
                        {s.valores
                          .filter(
                            (x) =>
                              sizes.find((s) => x.tamanhoId === s.id).visivel
                          )
                          .map((v) => (
                            <li className="valor" key={s.id + v.tamanhoId}>
                              <p>
                                {sizes
                                  .find((y) => y.id === v.tamanhoId)
                                  .nome.slice(0, 3)}
                              </p>
                              <strong>
                                {formatCurrency(v.valor).replace(",00", "")}
                                {/* {formatCurrency(
                                  (((v.valor + 5 + 2) * 100) / 70)
                                ).replace(",000", "")} */}
                              </strong>
                            </li>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </aside>
        ))}
      </CardapioOficioStyle>
    </div>
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
