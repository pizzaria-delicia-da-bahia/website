import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { LancheStyle } from "../../../styles/pages/pedido/lanche/styles";
import { useMyOrder } from "../../../context/myOrderContext";
import { ButtonSecondary } from "../../../styles/components/buttons";
import { IOutro } from "../../../types/outro";
import ItemQuantityModal from "../../../components/itemQuantityModal";
import { formatCurrency } from "../../../utitl/functions/format";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { sleep } from "../../../utitl/functions/misc";
import Loading from "../../../components/loading";
import Image from "next/image";

const Lanche: NextPage = () => {
  const { addItem } = useMyOrder();
  const [selectedItem, setSelectedItem] = useState<IOutro | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showQuantityModal, setShowQuantityModal] = useState<boolean>(false);
  const router = useRouter();

  const [lanches, setLanches] = useState<IOutro[]>([]);

  const loadItems = async () => {
    try {
      const lanchesFromBackend = (await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lanches`)
      ).json()) as IOutro[];
      setLanches(lanchesFromBackend);
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
    <LancheStyle>
      {lanches.length ? (
        <>
          <div className="text">
            <h1>LANCHE</h1>
          </div>
          <div className="menu">
            <ul>
              {lanches.map((lanche) => (
                <li
                  key={lanche.nome}
                  className={`${!lanche.disponivel ? "disabled" : undefined}`}
                  onClick={() => selectItem(lanche)}
                >
                  <div className="left">
                    {/* <img src={lanche.imagemUrl} width={40} height={40} /> */}
                    <Image
                      loader={() => lanche.imagemUrl}
                      src={lanche.imagemUrl}
                      width={110}
                      height={90}
                      objectFit={"cover"}
                    />
                  </div>

                  <div className="right">
                    <h5 className="title">{lanche.nome.toUpperCase()}</h5>
                    <p className="value">{formatCurrency(lanche.valor)}</p>
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
    </LancheStyle>
  );
};

export default Lanche;
