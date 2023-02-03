import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { BebidaStyle } from "../../../styles/pages/pedido/bebida/styles";
import { useMyOrder } from "../../../context/myOrderContext";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../../styles/components/buttons";
import { IOutro } from "../../../types/outro";
import ItemQuantityModal from "../../../components/itemQuantityModal";
import { formatCurrency } from "../../../utitl/functions/format";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { sleep } from "../../../utitl/functions/misc";

const Bebida: NextPage<{ bebidas: Array<IOutro> }> = ({ bebidas }) => {
  const { myOrder, addItem } = useMyOrder();
  const [selectedItem, setSelectedItem] = useState<IOutro | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showQuantityModal, setShowQuantityModal] = useState<boolean>(false);
  const router = useRouter();

  const selectItem = (item: IOutro) => {
    setSelectedItem(item);
    setShowQuantityModal(item ? true : false);
  };

  const confirmQuantity = async (item: IOutro) => {
    setShowQuantityModal(false);
    let itens: Array<IOutro> = Array(quantity).fill({});
    itens = itens.map((i) => (i = { ...item, id: uuidv4() }));
    addItem(itens);
    await sleep();
    router.push("/pedido");
  };
  const cancelQuantity = () => {
    selectItem(null);
  };
  return (
    <BebidaStyle>
      <div className="text">
        <h1>BEBIDA</h1>
      </div>
      <div className="menu">
        <ul>
          {bebidas.map((bebida) => (
            <li
              key={bebida.nome}
              className={`${!bebida.disponivel ? "disabled" : undefined}`}
              onClick={() => selectItem(bebida)}
            >
              <div className="left">
                <img src={bebida.imagemUrl} width={40} height={40} />
              </div>

              <div className="right">
                <h5 className="title">{bebida.nome.toUpperCase()}</h5>
                <p className="value">{formatCurrency(bebida.valor)}</p>
              </div>
            </li>
          ))}
        </ul>
        <ItemQuantityModal
          item={selectedItem}
          value={quantity}
          setValue={setQuantity}
          showModal={showQuantityModal}
          confirm={() => confirmQuantity(selectedItem)}
          cancel={cancelQuantity}
        />
      </div>
      <nav className="bottom-controls">
        <ButtonSecondary onClick={() => router.back()}>VOLTAR</ButtonSecondary>
      </nav>
    </BebidaStyle>
  );
};

export default Bebida;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bebidas = await (await fetch(`${process.env.API_URL}/bebidas`)).json();
  return {
    props: {
      bebidas,
    },
  };
};
