import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
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
import Loading from "../../../components/loading";
import Image from "next/image";

const Bebida: NextPage<{ api_url: string }> = ({ api_url }) => {
  const { myOrder, addItem } = useMyOrder();
  const [selectedItem, setSelectedItem] = useState<IOutro | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showQuantityModal, setShowQuantityModal] = useState<boolean>(false);
  const router = useRouter();

  const [bebidas, setBebidas] = useState<IOutro[]>([]);

  const loadItems = async () => {
    try {
      const bebidasFromBackend = (await (
        await fetch(`${api_url}/bebidas`)
      ).json()) as IOutro[];
      setBebidas(bebidasFromBackend);
    } catch (err) {
      console.error((err as Error).message, (err as Error).stack);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

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
      {bebidas.length ? (
        <>
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
                    <Image
                      loader={() => bebida.imagemUrl}
                      src={bebida.imagemUrl}
                      width={40}
                      height={80}
                      objectFit={"cover"}
                    />
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
            <ButtonSecondary onClick={() => router.back()}>
              VOLTAR
            </ButtonSecondary>
          </nav>
        </>
      ) : (
        <Loading />
      )}
    </BebidaStyle>
  );
};

export default Bebida;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      api_url: process.env.API_URL,
    },
  };
};
