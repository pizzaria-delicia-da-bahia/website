import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ButtonBackForward } from "@styles/components/buttons";
import { CarouselStyle } from "./styles";

interface ICarouselProvider {
  length: number;
  defaultSelectedIndex?: number;
  children: ReactElement[];
}
interface ICarouselContext {
  length: number;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
}

const CarouselContext = createContext<ICarouselContext>({} as ICarouselContext);

const Carousel: FC<ICarouselProvider> = ({
  children,
  length,
  defaultSelectedIndex,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    defaultSelectedIndex ?? 1
  );

  return (
    <CarouselContext.Provider
      value={{ length, selectedIndex, setSelectedIndex }}
    >
      <CarouselComponent>{children}</CarouselComponent>
    </CarouselContext.Provider>
  );
};

export const useCarousel = () => {
  return useContext(CarouselContext);
};

const CarouselComponent: FC<{ children: ReactElement[] }> = ({ children }) => {
  const { selectedIndex, setSelectedIndex, length } = useCarousel();

  useEffect(() => {
    if (children) {
      document.querySelector(".selected.selected").scrollIntoView();
    }
  }, [children]);

  return (
    <CarouselStyle>
      <div className="carousel-container">
        <ul>{children}</ul>
      </div>

      <div className="buttons-back-forward">
        <ButtonBackForward
          to="back"
          disabled={selectedIndex === 0}
          onClick={() => {
            setSelectedIndex((prev) => prev - 1);
          }}
        />
        <ButtonBackForward
          to="forward"
          disabled={selectedIndex === length - 1}
          onClick={() => setSelectedIndex((prev) => prev + 1)}
        />
      </div>
    </CarouselStyle>
  );
};
export default Carousel;
