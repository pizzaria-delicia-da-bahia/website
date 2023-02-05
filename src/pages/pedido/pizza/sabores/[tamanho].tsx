import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  IPizzaSabor,
  IPizzaGrupo,
  IPizzaSaborValor,
  IPizzaTamanho,
} from "../../../../types/pizza";
import { IPizza } from "../../../../types/item";
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
import Loading from "../../../../components/loading";

const Sabores: NextPage<{ tamanhoId: string; api_url: string }> = ({
  tamanhoId,
  api_url,
}) => {
  const router = useRouter();
  const [checkedList, setCheckedList] = useState<IPizzaSabor[]>([]);
  const { addItem } = useMyOrder();
  const [size, setSize] = useState<IPizzaTamanho | null>(null);
  const [groups, setGroups] = useState<Array<IPizzaGrupo[]>>([]);

  const loadAll = async () => {
    try {
      const sizesFromBackend = (await (
        await fetch(`${api_url}/pizzas/tamanhos?id=${tamanhoId}`)
      ).json()) as IPizzaTamanho[];

      if (!sizesFromBackend[0]) throw new Error("Tamanho inválido");
      setSize(sizesFromBackend[0]);

      const groupsFromBackend = (await (
        await fetch(`${api_url}/pizzas/sabores`)
      ).json()) as IPizzaGrupo[];

      const groupsLeft: IPizzaGrupo[] = [];
      const groupsRight: IPizzaGrupo[] = [];

      groupsFromBackend.forEach((g) => {
        groupsFromBackend.indexOf(g) % 2 === 0
          ? groupsLeft.push(g)
          : groupsRight.push(g);
      });

      setGroups([groupsLeft, groupsRight]);
    } catch (e) {
      console.error((e as Error).message, (e as Error).stack);
      router.back();
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const getAllValues = (valores: IPizzaSaborValor[]) => {
    return (
      size &&
      getValueString({
        name: size.nome,
        value: valores.find((x) => x.tamanhoId === size.id).valor,
      })
    );
  };

  const getGroups = (g: IPizzaGrupo) => (
    <div className="group" key={g.nome}>
      <h2 className="group-name">{g.nome}</h2>
      <div className="group-flavours">
        {g.sabores.map((s) => (
          <Sabor
            key={s.id}
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
  const getSaborValor = (s) => {
    const value = s.valores.find((v) => v.tamanhoId === size.id).valor;
    return value;
  };

  const getValorFormatted = (v: number) =>
    formatCurrency(v / checkedList.length);

  const next = () => {
    const midValue =
      checkedList.reduce((max, curr) => getSaborValor(curr) + max, 0) /
      checkedList.length;

    const novaPizza: IPizza = {
      valor: midValue,
      sabores: checkedList,
      tamanho: size,
      id: uuidv4(),
    };

    addItem(novaPizza);
    alert("clicou " + JSON.stringify(novaPizza));
    router.push("/pedido");
  };
  return (
    <SaboresStyle>
      {groups.length && size ? (
        <>
          <div className="text">
            <h1>SABORES</h1>
            {size && <h4>SELECIONE ATÉ {size.maxSabores}</h4>}
          </div>
          <div className="groups">
            <aside className="groups-left">
              {groups[0].map((g) => getGroups(g))}
            </aside>
            <aside className="groups-right">
              {groups[1].map((g) => getGroups(g))}
            </aside>
          </div>
          <nav className="bottom-controls">
            <ButtonSecondary onClick={() => router.back()}>
              VOLTAR
            </ButtonSecondary>
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
            onClick={next}
          >
            <p>Pronto! {">>"}</p>
            <b>
              {getValorFormatted(
                checkedList.reduce((max, curr) => getSaborValor(curr) + max, 0)
              )}
            </b>
          </FloatButton>
        </>
      ) : (
        <Loading />
      )}
    </SaboresStyle>
  );
};

export default Sabores;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      api_url: process.env.API_URL,
      tamanhoId: ctx.query["tamanho"],
    },
  };
};
