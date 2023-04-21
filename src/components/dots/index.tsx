import { DotsStyle } from "./styles";

export const Dots = ({ items }) => {
  return (
    <DotsStyle>
      {items.map((x) => (
        <span key={x} />
      ))}
    </DotsStyle>
  );
};
