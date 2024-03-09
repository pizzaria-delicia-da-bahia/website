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
  defaultSelectedIndex = 1,
}) => {
  const [selectedIndex, setSelectedIndex] =
    useState<number>(defaultSelectedIndex);

  useEffect(() => {
    console.log(defaultSelectedIndex, selectedIndex);
  });

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
    </CarouselStyle>
  );
};
export default Carousel;
