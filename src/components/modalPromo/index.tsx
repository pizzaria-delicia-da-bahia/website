import { useNavigation } from "@context/navigationContext";
import { colors } from "@styles/colors";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { ModalPromoStyle } from "./styles";
import MobilePromoImage from "@assets/images/promo-mobile.svg";
import DesktopPromoImage from "@assets/images/promo-desktop.svg";

const ModalPromo: FC<{
  goItURL?: string;
  goItButtonColor?: string;
  goItButtonBg?: string;
  timeToExitInMs?: number;
}> = ({ goItURL, goItButtonColor, goItButtonBg, timeToExitInMs }) => {
  const { setModalPromo } = useNavigation();
  const router = useRouter();
  if (timeToExitInMs)
    setTimeout(() => {
      setModalPromo(<></>);
    }, timeToExitInMs);

  function goToPromo() {
    setModalPromo(<></>);
    router.push(goItURL);
  }
  return (
    <ModalPromoStyle>
      <button
        className="close-button"
        onClick={() => {
          setModalPromo(<></>);
        }}
      >
        x
      </button>
      <main onClick={() => goToPromo()}>
        <Image
          className="mobile"
          layout={"fill"}
          priority
          src={MobilePromoImage.src}
        />
        <Image
          className="desktop"
          layout={"fill"}
          priority
          src={DesktopPromoImage.src}
        />
      </main>
    </ModalPromoStyle>
  );
};
export default ModalPromo;
