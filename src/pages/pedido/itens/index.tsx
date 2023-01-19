import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Context,
  createRef,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { ItensStyle } from "../../../styles/pages/pedido/itens/styles";
import { useMyOrder } from "../../../context/myOrderContext";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../../styles/components/buttons";
import { useRouter } from "next/router";
import { IPizza } from "../../../types/item";
import { formatCurrency } from "../../../utitl/functions/format";

const Itens: NextPage = () => {
  const { myOrder, removeItem } = useMyOrder();
  const router = useRouter();

  const backToOrder = () => {
    if (myOrder.items.length === 0) router.push("/pedido");
  };

  useEffect(() => {
    backToOrder();
  }, []);

  return (
    <ItensStyle>
      <div className="text">
        <h1>MEUS ITENS</h1>
      </div>
      <div className="menu">
        <ul>
          {myOrder.items.map((item) => (
            <li key={item.id}>
              {item.hasOwnProperty("sabores") ? (
                <div className="left">
                  <h3 className="item-title">
                    Pizza {(item as IPizza).tamanho.nome}
                  </h3>
                  <h5 className="item-subtitle">
                    Sabores:{" "}
                    {(item as IPizza).sabores
                      .map((s) => s.nome.split(" ").slice(0, -1).join(" "))
                      .join(", ")}
                  </h5>
                  <h5 className="item-info">
                    Preço: {formatCurrency(item.valor)}
                  </h5>
                </div>
              ) : (
                <h1>{item["nome"]}</h1>
              )}
              <div className="right">
                <button
                  title="Remover item"
                  onClick={() => removeItem(item.id)}
                >
                  x
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <nav className="bottom-controls">
        <ButtonSecondary onClick={() => router.back()}>VOLTAR</ButtonSecondary>
        <ButtonPrimary disabled={(myOrder?.items?.length ?? 0) < 1}>
          PEDIDO PRONTO!
        </ButtonPrimary>
      </nav>
    </ItensStyle>
  );
};

export default Itens;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      bebidas: {},
    },
  };
};
