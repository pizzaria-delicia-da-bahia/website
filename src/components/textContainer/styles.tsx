import styled from "styled-components";

interface Props {}

export const TextContainerStyle = styled.div.attrs((props: Props) => props)`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
