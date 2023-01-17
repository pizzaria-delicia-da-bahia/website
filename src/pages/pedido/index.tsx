import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { createRef, ReactElement, useEffect, useRef, useState } from "react";
import { Badge } from "../../components/badge";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../styles/components/buttons";
import { PedidoStyle } from "../../styles/pages/pedido/styles";

const Pedido: NextPage = () => {
  const [selected, setSelected] = useState<number>(1);
  const scrollRef = useRef<Array<ReactElement>>([]);
  const uref = createRef<ReactElement>();
  const items = ["LANCHES", "PIZZAS", "BEBIDAS"];
  // const myItems: Array<IItem> =

  useEffect(() => {
    console.log(selected);
    // scrollToSection(items[selected]);
  }, [selected]);

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
    <PedidoStyle>
      <div className="text">
        <h1>MONTE SEU PEDIDO</h1>
        <h4>ADICIONE UM ITEM</h4>
      </div>
      <div className="menu">
        <button
          className="tab-items back"
          disabled={selected === 0}
          onClick={() => setSelected((prev) => prev - 1)}
        >
          {"<"}
        </button>
        <ul className="menu-items">
          {items.map((item, index) => (
            <Link href={`/pedido/${item.toLowerCase()}`} passHref key={item}>
              <li
                className={`item ${getSelected(index)} ${getPosition(index)}`}
                ref={(ref) => (scrollRef.current[item] = ref)}
                onMouseEnter={() => setSelected(index)}
              >
                <Image
                  src={
                    item === "LANCHES"
                      ? "/images/pedido-lanche.svg"
                      : item === "PIZZAS"
                      ? "/images/pedido-pizza.svg"
                      : item === "BEBIDAS"
                      ? "/images/pedido-bebida.svg"
                      : "/images/pedido-pizza.svg"
                  }
                  width={100}
                  height={100}
                  alt=""
                />
                <h2>{item}</h2>
              </li>
            </Link>
          ))}
        </ul>
        <button
          className="tab-items forward"
          disabled={selected === 2}
          onClick={() => setSelected((prev) => prev + 1)}
        >
          {">"}
        </button>
      </div>
      <nav className="bottom-controls">
        <ButtonSecondary disabled={false}>
          <p>MEUS ITENS</p>
          <Badge number={5} />
        </ButtonSecondary>
        <ButtonPrimary disabled={false}>PEDIDO PRONTO!</ButtonPrimary>
      </nav>
    </PedidoStyle>
  );
};

export default Pedido;
