import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  IPizzaSabor,
  IPizzaGrupo,
  IPizzaSaborValor,
  IPizzaTamanho,
} from "@models/pizza";
import { formatCurrency, getValueString } from "@util/format";
import { IItem, IPizza } from "@models/item";
import { IOutro } from "@models/outro";
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
import { toast } from "react-toastify";
import Modal from "@components/modal";
import { usePromo } from "@context/promoContext";

const tamanhoId = "656a0b4781f555282573eb4a";

const Sabores: NextPage = () => {
  const router = useRouter();
  const [checkedList, setCheckedList] = useState<IPizzaSabor[]>([]);
  const { addItem } = useMyOrder();
  const [size, setSize] = useState<IPizzaTamanho | null>(null);
  const [groups, setGroups] = useState<Array<IPizzaGrupo[]>>([]);
  const [nextInactive, setNextInactive] = useState<boolean>(false);
  const [comboId] = useState<string>(uuidv4());

  const { getDuasRefri60, promosCarregadas } = usePromo();

  const [showModal, setShowModal] = useState<boolean>(false);

  const [observacao, setObservacao] = useState<string>("");

  const [itensEscolhidos, setItensEscolhidos] = useState<IPizza[]>([]);
  const comCoca = true;
  const valorSaborFixo = comCoca ? 26.5 : 25;

  const addItemPromo = (item: IPizza | IPizza[]) => {
    const itens = Array.isArray(item) ? item : [item];

    setItensEscolhidos((prev) => [
      ...prev,
      ...itens.map((x) => ({
        ...x,
        observacao: [x.observacao, "PROMOCIONAL"].filter(Boolean).join(" "),
        comboId,
      })),
    ]);
  };
  useEffect(() => {
    if (itensEscolhidos.length === 1) {
      toast("Pizza adicionada! Agora adicione a segunda pizza.", {
        type: "success",
      });

      setCheckedList([]);
      setNextInactive(false);
    } else if (itensEscolhidos.length === 2) {
      const novaBebida: IOutro | undefined = comCoca
        ? {
            id: "656a212781f555282589ba9b",
            nome: "COCA COLA 1l",
            disponivel: true,
            imagemUrl: "https://i.ibb.co/XpRF5ry/FRENTE.jpg",
            valor: 7,
            observacao: "",
            tipo: "BEBIDA",
            vendidos: 50,
            visivel: true,
            comboId,
          }
        : undefined;

      const itensFinais: IItem[] = [...itensEscolhidos];

      if (comCoca) itensFinais.push(novaBebida);

      addItem(itensFinais);
      router.push("/pedido");
    }
  }, [itensEscolhidos]);

  useEffect(() => {
    if (promosCarregadas) {
      if (getDuasRefri60()) {
        router.push("/pedido");
      }
    }
  }, [promosCarregadas]);

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
        await fetch(`${env.apiURL}/pizzas/sabores?promocionais=true`, {
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

  const getGroups = (g: IPizzaGrupo) => (
    <div className="group" key={g.nome}>
      <h2 className="group-name">{g.nome}</h2>
      <div className="group-flavours">
        {g.sabores.map((s) => (
          <Sabor
            key={s.id}
            nome={s.nome}
            ingredientes={s.ingredientes}
            showCheckBox={true}
            active={s.disponivel}
            checked={!!checkedList.find((x) => x.nome === s.nome)}
            setChecked={(value) => {
              value
                ? 2 > checkedList.length &&
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
    return valorSaborFixo;
  };

  const getValorFormatted = (v: number) =>
    formatCurrency(Math.ceil(v / checkedList.length));

  const next = () => {
    try {
      setNextInactive(true);
      setShowModal(false);
      const midValue =
        checkedList.reduce((max, curr) => getSaborValor(curr) + max, 0) /
        checkedList.length;
      const novaPizza: IPizza = {
        tipo: "PIZZA",
        valor: valorSaborFixo,
        sabores: checkedList,
        tamanho: size,
        id: uuidv4(),
        observacao,
      };

      addItemPromo(novaPizza);
    } catch (e) {
      console.error((e as Error).message, (e as Error).stack);
      setNextInactive(false);
    }
  };

  if (getDuasRefri60()) return <></>;
  return (
    <SaboresStyle>
      <p className="title">
        {comCoca ? (
          <>
            <h5 className="title">2 pizzas G + 1 Coca 1L por:</h5>
            <h1>R$ 59,99</h1>
          </>
        ) : (
          <>
            <h5 className="title">2 pizzas GRANDES por:</h5>
            <h1>R$ 49,99</h1>
          </>
        )}
      </p>
      {groups.length && size ? (
        <>
          <TextContainer title="SABORES" subtitle={size && `SELECIONE ATÉ 2`} />
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
