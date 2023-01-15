import Image from "next/image";
import { FC } from "react";
import _Logo from "../../../assets/images/logo.svg";
import { useNavigation } from "../../../context/navigationContext";
import { LogoStyle } from "./styles";

export const Logo: FC = () => {
  const { menuOpen } = useNavigation();
  return (
    <LogoStyle menuOpen={menuOpen}>
      <Image
        src={_Logo}
        alt="Logo Delicia da bahia, 
            contém um chapéu estilo 
            Toque-Blanche, a palavra 
            'Delicia' escrito em vermelho, 
            e o complemento 'da bahia', 
            logo abaixo, escrito em preto. 
            De cada lado há dois ornamentos 
            retangulares azuis curvados para 
            baixo de forma contrária"
      />
    </LogoStyle>
  );
};
