import { useNavigation } from "@context/navigationContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { ModalPromoStyle } from "./styles";

const ModalPromo2: FC<{
  url?: string;
  image: string;
}> = ({ url, image }) => {
  const { setModalPromo } = useNavigation();
  const router = useRouter();

  function goToPromo() {
    setModalPromo(<></>);
    router.push(url);
  }
  return (
    <ModalPromoStyle
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setModalPromo(<></>);
        }
      }}
    >
      <button
        className="close-button"
        onClick={() => {
          setModalPromo(<></>);
        }}
      >
        x
      </button>
      <main>
        <Image
          layout={"fill"}
          priority
          src={image}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              goToPromo();
            }
          }}
        />
      </main>
    </ModalPromoStyle>
  );
};
export default ModalPromo2;
