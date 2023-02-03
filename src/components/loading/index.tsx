import type { FC } from "react";
import { LoadingStyle } from "./styles";

const Loading: FC = () => {
  return (
    <LoadingStyle>
      <h1>Carregando...</h1>
      <span className="lds-dual-ring" />
    </LoadingStyle>
  );
};
export default Loading;
