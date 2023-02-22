import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { PecaJaButton } from "@components/pecaja";
import { HomeStyle } from "@styles/pages/home/styles";
import PizzaImage from "@assets/pages/home/pizza_1.png";
import { useNavigation } from "@context/navigationContext";

const Home: NextPage = () => {
  const { menuOpen } = useNavigation();
  return (
    <HomeStyle menuOpen={menuOpen}>
      <div className="left">
        <h3>TÁ NA HORA</h3>
        <h1>DA PIZZA</h1>
        <PecaJaButton style="large" />
      </div>
      <div className="right">
        <div className="image-wrapper">
          <Image
            className="pizza-image"
            width={1000}
            height={1000}
            src={PizzaImage}
            alt="Image of a pizza floating by the window."
          />
        </div>
      </div>
    </HomeStyle>
  );
};

export default Home;
