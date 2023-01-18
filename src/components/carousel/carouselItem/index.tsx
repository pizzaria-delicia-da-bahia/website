import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useCarousel } from "..";
import { CarouselItemStyle } from "./styles";

interface ICarouselItem {
  route: string;
  title: string;
  image: { src: string; w: number; h: number };
  index: number;
}

const CarouselItem: FC<ICarouselItem> = ({ route, title, image, index }) => {
  const { selectedIndex, length } = useCarousel();

  return (
    <Link href={route} passHref key={title} style={{ display: "none" }}>
      <CarouselItemStyle
        className={`${selectedIndex === index ? "selected" : ""}${
          index < selectedIndex - 1 ? "hidden" : ""
        }`}
        index={index}
        selectedIndex={selectedIndex}
        length={length}
      >
        <Image src={image.src} width={image.w} height={image.h} alt="" />
        <h2>{title}</h2>
      </CarouselItemStyle>
    </Link>
  );
};
export default CarouselItem;
