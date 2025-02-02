import Image from "next/image";
import { ModalCardsStyle } from "./styles";

export const Cards = ({
  items,
}: {
  items: {
    id: string;
    image: string;
    label?: string;
    isDefault?: boolean;
    click: () => void;
  }[];
}) => {
  return (
    <ModalCardsStyle>
      {items.map((item) => (
        <div key={item.id} className="card" onClick={item.click}>
          <div className="img">
            <Image src={item.image} layout="fill" priority />
          </div>
          {!!item.label && <h3>{item.label}</h3>}
        </div>
      ))}
    </ModalCardsStyle>
  );
};
