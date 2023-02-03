import { GetStaticProps, NextPage } from "next";
import { CardapioStyle } from "../../styles/pages/cardapio/styles";
import { ICardapio } from "../../types/cardapio";
import { IPizzaSabor, IPizzaGrupo } from "../../types/pizza";
import { getValueString } from "../../utitl/functions/format";
import { Sabor } from "../../components/cardapio/sabor";

const Cardapio: NextPage<ICardapio> = ({ sizes, groupsLeft, groupsRight }) => {
  const getAllValues = (s: IPizzaSabor) => {
    return s.valores
      .map((v) =>
        getValueString({
          ...v,
          tamanhoId: sizes.find((x) => x.id === v.tamanhoId).nome,
        })
      )
      .join(", ");
  };

  const getGroups = (g: IPizzaGrupo) => (
    <div className="group" key={g.nome}>
      <h2 className="group-name">{g.nome}</h2>
      <div className="group-flavours">
        {g.sabores.map((s) => (
          <Sabor
            key={s.nome}
            nome={s.nome}
            ingredientes={s.ingredientes}
            active={s.disponivel}
            valuesString={getAllValues(s)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <CardapioStyle>
      <div className="sizes">
        {sizes
          .filter((x) => x.visivel)
          .map((s) => (
            <li key={s.nome} className="size">
              <label>
                {s.nome} - {s.fatias} Fatias
              </label>
              <div className="info">
                <label>
                  Até {s.maxSabores} sabor{s.maxSabores > 1 && "es"}
                </label>
                <label>Aprox. {s.tamanhoAprox}cm</label>
              </div>
            </li>
          ))}
      </div>
      <p className="value-detail">
        * O valor da pizza será calculado pelo <b>valor médio</b> dos sabores
        escolhidos*
      </p>
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
  const sizes = await (
    await fetch(`${process.env.API_URL}/pizzas/tamanhos`)
  ).json();

  const grupos = await (
    await fetch(`${process.env.API_URL}/pizzas/sabores`)
  ).json();

  const groupsLeft = [];
  const groupsRight = [];

  grupos.forEach((g: IPizzaGrupo) => {
    grupos.indexOf(g) % 2 === 0 ? groupsLeft.push(g) : groupsRight.push(g);
  });

  return {
    props: {
      sizes,
      groupsLeft,
      groupsRight,
    },
  };
};
