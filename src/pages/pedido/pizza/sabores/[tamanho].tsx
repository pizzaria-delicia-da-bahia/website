import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { CardapioStyle } from "../../../../styles/pages/cardapio/styles";
import { tamanhos } from "../../../../data/tamanhos.json";
import sabores from "../../../../data/sabores.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IGrupo, ICardapio } from "../../../../types/cardapio";
import { IPizza, ISabor, ITamanho, IValor } from "../../../../types/item";
import {
  formatCurrency,
  getValueString,
} from "../../../../utitl/functions/format";
import { Sabor } from "../../../../components/cardapio/sabor";
import { SaboresStyle } from "../../../../styles/pages/pedido/pizza/sabores/styles";
import { useMyOrder } from "../../../../context/myOrderContext";
import { prepareServerlessUrl } from "next/dist/server/base-server";
import { FloatButton } from "../../../../styles/components/buttons";
import { v4 as uuidv4 } from "uuid";

const Sabores: NextPage<ICardapio> = () => {
  const router = useRouter();
  const [tamanho, setTamanho] = useState<ITamanho | null>(null);
  const [checkedList, setCheckedList] = useState<ISabor[]>([]);
  const { addItem } = useMyOrder();
  const groupsLeft = sabores.grupos.filter((g, i) => i % 2 === 0);
  const groupsRight = sabores.grupos.filter((g, i) => i % 2 > 0);
  if (!router.query["tamanho"]) router.back();

  useEffect(() => {
    const a = tamanhos.find((x) => x.nome === router.query["tamanho"]);
    setTamanho(a ?? null);
  }, []);

  const getAllValues = (valores: IValor[]) => {
    return (
      tamanho &&
      getValueString(
        valores.find(
          (x) => x.tamanho.toUpperCase() === tamanho.nome.toUpperCase()
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
            checked={!!checkedList.find((x) => x.nome === s.nome)}
            setChecked={(value) => {
              value
                ? tamanho.maxSabores > checkedList.length &&
                  setCheckedList((prev) => [...prev, s])
                : setCheckedList((prev) => {
                    console.log(prev);
                    return prev.filter((x) => x.nome !== s.nome);
                  });
            }}
          />
        ))}
      </div>
    </div>
  );
  const getSaborValor = (s) =>
    s.valores.find(
      (v) => v.tamanho.toUpperCase() === tamanho.nome.toUpperCase()
    ).valor;

  const getValorFormatted = (v: number) =>
    formatCurrency(v / checkedList.length);
  return (
    <SaboresStyle>
      <div className="text">
        <h1>SABORES</h1>
        {tamanho && <h4>SELECIONE ATÉ {tamanho.maxSabores}</h4>}
      </div>
      <div className="menu"></div>
      <div className="groups">
        <aside className="groups-left">
          {groupsLeft.map((g) => getGroups(g))}
        </aside>
        <aside className="groups-right">
          {groupsRight.map((g) => getGroups(g))}
        </aside>
      </div>
      <FloatButton
        className={`${checkedList.length === 0 ? "hidden" : undefined}`}
        onClick={() => {
          addItem({
            valor: checkedList.reduce(
              (max, curr) => getSaborValor(curr) + max,
              0
            ),
            sabores: checkedList,
            tamanho,
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
