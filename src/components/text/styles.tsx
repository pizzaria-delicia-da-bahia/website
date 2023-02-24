import { colors } from "@styles/colors";
import styled from "styled-components";

interface Props {
  color?: "primary" | "secondary" | string;
}

export const Title = styled.h1.attrs((props: Props) => props)`
  color: ${(props) =>
    props.color === "primary"
      ? colors.elements
      : props.color === "secondary"
      ? "#fff"
      : props.color || colors.elements};
  font-size: clamp(1.5rem, 1.8rem, 6vw);
`;

export const Subtitle = styled.h3.attrs((props: Props) => props)`
  color: ${(props) =>
    props.color === "primary"
      ? colors.elements
      : props.color === "secondary"
      ? "#fff"
      : props.color || "#fff"};
  font-size: clamp(0.8rem, 1rem, 5vw);
`;

export const Description = styled.p.attrs((props: Props) => props)`
  color: ${(props) =>
    props.color === "primary"
      ? colors.elements
      : props.color === "secondary"
      ? "#fff"
      : props.color || "#fff"};
  font-size: clamp(0.6rem, 0.8rem, 4vw);
`;
