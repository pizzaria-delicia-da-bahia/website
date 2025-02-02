import Text from "@components/text";
import type { FC } from "react";
import { LoadingStyle } from "./styles";

const Loading: FC = () => {
  return (
    <LoadingStyle>
      <Text type="title" color="#fff">
        Carregando...
      </Text>
      <span className="lds-dual-ring" />
    </LoadingStyle>
  );
};
export default Loading;
