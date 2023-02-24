import { Title, Subtitle, Description } from "@components/text/styles";
import type { FC, ReactElement } from "react";
import { TextContainerStyle } from "./styles";

interface TextContainerProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const TextContainer: FC<TextContainerProps> = ({
  title,
  subtitle,
  description,
}) => {
  if (!title && !subtitle && !description) return <></>;
  return (
    <TextContainerStyle>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {description && <Description>{description}</Description>}
    </TextContainerStyle>
  );
};
export default TextContainer;
