import { NextPage } from "next";

import { useEffect } from "react";
import { ItensStyle } from "@styles/pages/pedido/itens/styles";
import { useMyOrder } from "@context/myOrderContext";
import { useRouter } from "next/router";
import { IPizza } from "@models/item";
import { IOutro } from "@models/outro";
import { formatCurrency } from "@util/format";
import Text from "@components/text";
import BottomControls from "@components/pedido/bottomControls";

const Itens: NextPage = () => {
  const { myOrder, removeItem } = useMyOrder();
  const router = useRouter();

  const backToOrder = () => {
    if (!myOrder?.itens?.length) router.push("/pedido");
  };

  useEffect(() => {
    backToOrder();
  }, []);

  const next = () => {
    router.push(`/pedido/informacoes-adicionais`);
  };

  return (
    <ItensStyle>
      <Text type="title">MEUS ITENS</Text>
      <div className="menu">
        <ul>
          {(myOrder?.itens ?? []).map((item) => (
            <li key={item.id}>
              {item.hasOwnProperty("sabores") ? (
                <div className="left">
                  <div className="subdiv">
                    <div className="subleft">
                      <img
                        src={"/images/pedido-pizza.svg"}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="subright">
                      <h3 className="item-title">
                        Pizza {(item as IPizza).tamanho.nome}
                      </h3>
                      <h5 className="item-subtitle">
                        Sabores:{" "}
                        {(item as IPizza).sabores
                          .map((s) => s.nome.split(" ").slice(0, -1).join(" "))
                          .join(", ")}
                      </h5>
                      {item?.observacao && (
                        <p className="item-obs">{item.observacao}</p>
                      )}
                      <h5 className="item-info">
                        Preço: {formatCurrency(item.valor)}
                      </h5>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="left">
                  <div className="subdiv">
                    <span className="subleft">
                      <img
                        src={(item as IOutro).imagemUrl}
                        width={40}
                        height={40}
                      />
                    </span>
                    <span className="subright">
                      <h3 className="item-title">
                        {(item as IOutro)?.nome.toUpperCase()}
                      </h3>
                      <h5 className="item-info">
                        Preço: {formatCurrency(item.valor)}
                      </h5>
                    </span>
                  </div>
                </div>
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
      <BottomControls
        backButton
        primaryButton={{
          click: next,
          disabled: (myOrder?.itens?.length ?? 0) < 1,
        }}
      />
    </ItensStyle>
  );
};

export default Itens;
