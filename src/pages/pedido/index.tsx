import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { createRef, ReactElement, useEffect, useRef, useState } from "react";
import { Badge } from "../../components/badge";
import { useMyOrder } from "../../context/myOrderContext";
import {
  ButtonBackForward,
  ButtonPrimary,
  ButtonSecondary,
} from "../../styles/components/buttons";
import { PedidoStyle } from "../../styles/pages/pedido/styles";

const Pedido: NextPage = () => {
  const [selected, setSelected] = useState<number>(1);
  const scrollRef = useRef<Array<ReactElement>>([]);
  const uref = createRef<ReactElement>();
  const items = [
    { name: "LANCHES", route: "lanche", image: "/images/pedido-lanche.svg" },
    {
      name: "PIZZAS",
      route: "pizza/tamanho",
      image: "/images/pedido-pizza.svg",
    },
    { name: "BEBIDAS", route: "bebida", image: "/images/pedido-bebida.svg" },
  ];
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
    <PedidoStyle>
      <div className="text">
        <h1>MONTE SEU PEDIDO</h1>
        <h4>ADICIONE UM ITEM</h4>
      </div>
      <div className="menu">
        <ButtonBackForward
          to="back"
          disabled={selected === 0}
          onClick={() => setSelected((prev) => prev - 1)}
        />
        <ul className="menu-items">
          {items.map((item, index) => (
            <Link href={`/pedido/${item.route}`} passHref key={item.name}>
              <li
                className={`item ${getSelected(index)} ${getPosition(index)}`}
                ref={(ref) => (scrollRef.current[item.name] = ref)}
                onMouseEnter={() => setSelected(index)}
              >
                <Image src={item.image} width={100} height={100} alt="" />
                <h2>{item.name}</h2>
              </li>
            </Link>
          ))}
        </ul>
        <ButtonBackForward
          to="forward"
          disabled={selected === items.length - 1}
          onClick={() => setSelected((prev) => prev + 1)}
        />
      </div>
      <nav className="bottom-controls">
        <ButtonSecondary disabled={(myOrder?.items?.length ?? 0) < 1}>
          <p>MEUS ITENS</p>
          <Badge number={myOrder?.items?.length ?? 0} />
        </ButtonSecondary>
        <ButtonPrimary disabled={(myOrder?.items?.length ?? 0) < 1}>
          PEDIDO PRONTO!
        </ButtonPrimary>
      </nav>
    </PedidoStyle>
  );
};

export default Pedido;
