import { NextPage } from "next";
import Image from "next/image";
import { PecaJaButton } from "@components/pecaja";
import { HomeStyle } from "@styles/pages/home/styles";
import PizzaImage from "@assets/pages/home/pizza_1.png";

const Home: NextPage = () => {
  return (
    <HomeStyle>
      <div className="left">
        <div className="text-container">
          <h3 className="text little-text">TÁ NA HORA</h3>
          <h1 className="text large-text">DA PIZZA</h1>
        </div>
        <PecaJaButton style="large" />
      </div>
      <div className="right">
        <div className="image-wrapper">
          <Image
            className="pizza-image"
            layout="fill"
            src={PizzaImage}
            alt="Image of a pizza floating by the window."
            priority
          />
        </div>
      </div>
    </HomeStyle>
  );
};

export default Home;
