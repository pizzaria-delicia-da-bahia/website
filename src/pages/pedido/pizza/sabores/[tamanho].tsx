import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { IGrupo, ICardapio } from "../../../../types/cardapio";
import { IPizza, ISabor, IValor } from "../../../../types/item";
import {
  formatCurrency,
  getValueString,
} from "../../../../utitl/functions/format";
import { Sabor } from "../../../../components/cardapio/sabor";
import { SaboresStyle } from "../../../../styles/pages/pedido/pizza/sabores/styles";
import { useMyOrder } from "../../../../context/myOrderContext";
import {
  ButtonSecondary,
  FloatButton,
} from "../../../../styles/components/buttons";
import { v4 as uuidv4 } from "uuid";

const Sabores: NextPage<ICardapio> = ({ size, groupsLeft, groupsRight }) => {
  const router = useRouter();
  const [checkedList, setCheckedList] = useState<ISabor[]>([]);
  const { addItem } = useMyOrder();

  if (!size) router.back();

  const getAllValues = (valores: IValor[]) => {
    return (
      size &&
      getValueString(
        valores.find(
          (x) => x.tamanho.toUpperCase() === size.nome.toUpperCase()
        ) ??
          null ??
          null
      )
    );
  };

  const getGroups = (g: IGrupo) => (
    <div className="group" key={g.nome}>
      <h2 className="group-name">{g.nome}</h2>
      <div className="group-flavours">
        {g.sabores.map((s) => (
          <Sabor
            key={s.nome}
            nome={s.nome}
            ingredientes={s.ingredientes}
            valuesString={getAllValues(s.valores)}
            showCheckBox={true}
            active={s.disponivel}
            checked={!!checkedList.find((x) => x.nome === s.nome)}
            setChecked={(value) => {
              value
                ? size.maxSabores > checkedList.length &&
                  setCheckedList((prev) => [...prev, s])
                : setCheckedList((prev) => {
                    return prev.filter((x) => x.nome !== s.nome);
                  });
            }}
          />
        ))}
      </div>
    </div>
  );
  const getSaborValor = (s) =>
    s.valores.find((v) => v.tamanho.toUpperCase() === size.nome.toUpperCase())
      .valor;

  const getValorFormatted = (v: number) =>
    formatCurrency(v / checkedList.length);
  return (
    <SaboresStyle>
      <div className="text">
        <h1>SABORES</h1>
        {size && <h4>SELECIONE ATÉ {size.maxSabores}</h4>}
      </div>
      <div className="groups">
        <aside className="groups-left">
          {groupsLeft.map((g) => getGroups(g))}
        </aside>
        <aside className="groups-right">
          {groupsRight.map((g) => getGroups(g))}
        </aside>
      </div>
      <nav className="bottom-controls">
        <ButtonSecondary onClick={() => router.back()}>VOLTAR</ButtonSecondary>
      </nav>
      <div className="bottom-info">
        <h3 className="selected-flavours">
          <b>Selecionados: </b>
          {checkedList
            .map((s) => s.nome.split(" ").slice(0, -1).join(" "))
            .join(", ")}
        </h3>
      </div>
      <FloatButton
        className={`${checkedList.length === 0 ? "hidden" : undefined}`}
        onClick={() => {
          addItem({
            valor:
              checkedList.reduce((max, curr) => getSaborValor(curr) + max, 0) /
              checkedList.length,
            sabores: checkedList,
            tamanho: size,
            id: uuidv4(),
          } as IPizza);
          router.push("/pedido");
        }}
      >
        <p>Pronto! {">>"}</p>
        <b>
          {getValorFormatted(
            checkedList.reduce((max, curr) => getSaborValor(curr) + max, 0)
          )}
        </b>
      </FloatButton>
    </SaboresStyle>
  );
};

export default Sabores;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { tamanhos } = await (
    await fetch(`${process.env.API_URL}/pizzas/tamanhos`)
  ).json();

  const size = tamanhos.find((x) => x.nome === ctx.query["tamanho"]) ?? null;

  const { grupos } = await (
    await fetch(`${process.env.API_URL}/pizzas/sabores`)
  ).json();

  const groupsLeft = [];
  const groupsRight = [];

  grupos.forEach((g) => {
    grupos.indexOf(g) % 2 === 0 ? groupsLeft.push(g) : groupsRight.push(g);
  });

  return {
    props: {
      size,
      groupsLeft,
      groupsRight,
    },
  };
};
