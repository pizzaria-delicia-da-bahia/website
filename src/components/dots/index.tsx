import { DotsStyle } from "./styles";

export const Dots = ({ items }) => {
  return (
    <DotsStyle>
      {items.map((x) => (
        <span key={JSON.stringify(x)} />
      ))}
    </DotsStyle>
  );
};
