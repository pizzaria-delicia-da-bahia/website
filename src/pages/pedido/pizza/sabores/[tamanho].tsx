import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  IPizzaSabor,
  IPizzaGrupo,
  IPizzaSaborValor,
  IPizzaTamanho,
} from "@models/pizza";
import { IPizza } from "@models/item";
import { formatCurrency, getValueString } from "@util/format";
import { Sabor } from "@components/cardapio/sabor";
import { SaboresStyle } from "@styles/pages/pedido/pizza/sabores/styles";
import { useMyOrder } from "@context/myOrderContext";
import {
  ButtonPrimary,
  ButtonSecondary,
  FloatButton,
} from "@styles/components/buttons";
import { v4 as uuidv4 } from "uuid";
import Loading from "@components/loading";
import { env } from "@config/env";
import TextContainer from "@components/textContainer";
import BottomControls from "@components/pedido/bottomControls";
import Modal from "@components/modal";

const Sabores: NextPage<{ tamanhoId: string }> = ({ tamanhoId }) => {
  const router = useRouter();
  const [checkedList, setCheckedList] = useState<IPizzaSabor[]>([]);
  const { addItem } = useMyOrder();
  const [size, setSize] = useState<IPizzaTamanho | null>(null);
  const [groups, setGroups] = useState<Array<IPizzaGrupo[]>>([]);
  const [nextInactive, setNextInactive] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [observacao, setObservacao] = useState<string>("");

  const loadAll = async () => {
    try {
      const sizesFromBackend = (await (
        await fetch(`${env.apiURL}/pizzas/tamanhos?id=${tamanhoId}`, {
          headers: { "Content-Type": "application/json" },
        })
      ).json()) as IPizzaTamanho[];

      if (!sizesFromBackend[0]) throw new Error("Tamanho inválido");
      setSize(sizesFromBackend[0]);

      const groupsFromBackend = (await (
        await fetch(`${env.apiURL}/pizzas/sabores`, {
          headers: { "Content-Type": "application/json" },
        })
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
    formatCurrency(Number(Number(v / checkedList.length).toFixed(1)));

  const next = () => {
    try {
      setNextInactive(true);
      const midValue = Number(
        Number(
          checkedList.reduce((max, curr) => getSaborValor(curr) + max, 0) /
            checkedList.length
        ).toFixed(1)
      );
      const novaPizza: IPizza = {
        valor: midValue,
        sabores: checkedList,
        tamanho: size,
        observacao,
        id: uuidv4(),
      };

      addItem(novaPizza);
      router.push("/pedido");
    } catch (e) {
      console.error((e as Error).message, (e as Error).stack);
      setNextInactive(false);
    }
  };
  return (
    <SaboresStyle>
      {groups.length && size ? (
        <>
          <TextContainer
            title="SABORES"
            subtitle={size && `SELECIONE ATÉ ${size.maxSabores}`}
          />
          <div className="groups">
            <aside className="groups-left">
              {groups[0].map((g) => getGroups(g))}
            </aside>
            <aside className="groups-right">
              {groups[1].map((g) => getGroups(g))}
            </aside>
          </div>
          <BottomControls backButton notFixed />
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
            disabled={nextInactive}
            onClick={() => setShowModal(true)}
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

      {showModal && (
        <Modal
          className="observacoes-modal"
          label="Alguma observação à fazer?"
          description={`Por ex: "Sem cebola", ou "Bem assada"...`}
          type={"custom"}
          buttons={
            <>
              <ButtonPrimary
                onClick={() => {
                  next();
                }}
              >
                Pronto!
              </ButtonPrimary>
            </>
          }
        >
          <input
            type="text"
            placeholder="Ex: Pouco orégano..."
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                next();
              }
            }}
          />
        </Modal>
      )}
    </SaboresStyle>
  );
};

export default Sabores;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      tamanhoId: ctx.query["tamanho"],
    },
  };
};
