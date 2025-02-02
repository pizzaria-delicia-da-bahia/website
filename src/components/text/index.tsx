import type { FC, ReactElement } from "react";
import { Description, Subtitle, Title } from "./styles";

interface TextProps {
  type: "title" | "subtitle" | "description";
  color?: "primary" | "secondary" | string;
  children: string;
}

const Text: FC<TextProps> = ({ color, type, children }) => {
  const Component = {
    title: <Title color={color}>{children}</Title>,
    subtitle: <Subtitle color={color}>{children}</Subtitle>,
    description: <Description color={color}>{children}</Description>,
  };

  return Component[type];
};
export default Text;
