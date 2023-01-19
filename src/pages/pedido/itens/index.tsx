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

const Itens: NextPage = () => {
  const { myOrder } = useMyOrder();
  const router = useRouter();

  return (
    <ItensStyle>
      <div className="text">
        <h1>MEUS ITENS</h1>
      </div>
      <div className="menu">
        <ul>
          {myOrder.items.map((item) => (
            <li key={JSON.stringify(item)}>
              {item.hasOwnProperty("sabores") ? (
                <>
                  <h1>Pizza {(item as IPizza).tamanho.nome}</h1>
                  <h3>
                    Sabores:{" "}
                    {(item as IPizza).sabores
                      .map((s) => s.nome.split(" ").slice(0, -1).join(" "))
                      .join(", ")}
                  </h3>
                </>
              ) : (
                <h1>{item["nome"]}</h1>
              )}
              <button>x</button>
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
