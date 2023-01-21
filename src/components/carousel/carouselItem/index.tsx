import Image from "next/image";
import Link from "next/link";
import type { FC, ReactElement } from "react";
import { useCarousel } from "..";
import { CarouselItemStyle } from "./styles";

interface ICarouselItem {
  route: string;
  title: string;
  image: { src: string; w: number; h?: number };
  index: number;
  children?: ReactElement[];
}

const CarouselItem: FC<ICarouselItem> = ({
  route,
  title,
  image,
  index,
  children,
}) => {
  const { selectedIndex, length } = useCarousel();

  return (
    <Link href={route} passHref key={title} style={{ display: "none" }}>
      <CarouselItemStyle
        className={`${
          selectedIndex === index
            ? " selected"
            : selectedIndex + 1 === index
            ? " next"
            : selectedIndex - 1 === index
            ? " previous"
            : ""
        }${index < selectedIndex - 1 ? " hidden" : ""}`}
        index={index}
        selectedIndex={selectedIndex}
        length={length}
      >
        <div className="image-wrapper">
          <img
            src={image.src}
            width={image.w}
            height={image.h ?? image.w}
            alt=""
          />
        </div>
        <h2>{title}</h2>
        {children && <div className="bottom-elements">{children}</div>}
      </CarouselItemStyle>
    </Link>
  );
};
export default CarouselItem;
