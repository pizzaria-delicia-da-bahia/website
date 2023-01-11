import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { PecaJaButton } from "../../components/pecaja";
import { CardapioStyle } from "../../styles/pages/cardapio/styles";
import PizzaImage from "../../assets/pages/home/pizza_1.png";
import { useNavigation } from "../../context/navigationContext";

const Cardapio: NextPage = () => {
  return <CardapioStyle></CardapioStyle>;
};

export default Cardapio;
