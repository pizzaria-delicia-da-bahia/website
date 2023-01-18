import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { createRef, ReactElement, useEffect, useRef, useState } from "react";
import { useMyOrder } from "../../../../context/myOrderContext";
import {
  ButtonBackForward,
  ButtonSecondary,
} from "../../../../styles/components/buttons";
import { TamanhoStyle } from "../../../../styles/pages/pedido/pizza/tamanho/styles";
import tamanhos from "../../../../data/tamanhos.json";
const Tamanho: NextPage = () => {
  const [selected, setSelected] = useState<number>(1);
  const scrollRef = useRef<Array<ReactElement>>([]);
  const { myOrder } = useMyOrder();

  const getPosition = (index) =>
    index === 0 ? "first" : index === 1 ? "second" : "third";

  const getSelected = (index) =>
    selected === index
      ? "selected"
      : index === 0
      ? "previous"
      : (index === 2 && selected === 1) || index === 1
      ? "next"
      : "";

  return (
    <TamanhoStyle>
      <div className="text">
        <h1>TAMANHO</h1>
      </div>
      <div className="menu">
        <ButtonBackForward
          to="back"
          disabled={selected === 0}
          onClick={() => setSelected((prev) => prev - 1)}
        />
        <ul className="menu-items">
          {tamanhos.tamanhos.map((item, index) => (
            <Link
              href={`/pedido/pizza/sabores&tamanho=${item.nome.toLowerCase()}`}
              passHref
              key={item.nome}
            >
              <li
                className={`item ${getSelected(index)} ${getPosition(index)}`}
                ref={(ref) => (scrollRef.current[item.nome] = ref)}
                onMouseEnter={() => setSelected(index)}
              >
                <Image
                  src={"/images/pedido-pizza.svg"}
                  width={Math.ceil(
                    (100 / tamanhos.tamanhos.length) * (index + 1)
                  )}
                  height={Math.ceil(
                    (100 / tamanhos.tamanhos.length) * (index + 1)
                  )}
                  alt=""
                />
                <h2>{item.nome}</h2>
              </li>
            </Link>
          ))}
        </ul>
        <ButtonBackForward
          to="forward"
          disabled={selected === tamanhos.tamanhos.length - 1}
          onClick={() => setSelected((prev) => prev + 1)}
        />
      </div>
      <nav className="bottom-controls">
        <ButtonSecondary disabled={(myOrder?.items?.length ?? 0) < 1}>
          <p>VOLTAR</p>
        </ButtonSecondary>
      </nav>
    </TamanhoStyle>
  );
};

export default Tamanho;
