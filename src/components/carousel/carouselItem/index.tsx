import { useRouter } from "next/router";
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
  const router = useRouter();

  return (
    // <Link href={route} passHref key={title}>
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
      onClick={() => router.push(route)}
      index={index}
      selectedIndex={selectedIndex}
      length={length}
      key={title}
    >
      <div className="image-wrapper">
        <img
          src={image.src}
          width={image.w}
          height={image.h ?? image.w}
          alt=""
        />
      </div>
      <h3>{title}</h3>
      {children && <div className="bottom-elements">{children}</div>}
    </CarouselItemStyle>
    // </Link>
  );
};
export default CarouselItem;
