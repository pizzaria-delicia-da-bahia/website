import { NextPage } from "next";
import type { FC } from "react";
import Page from "../components/page";
import { FourZeroFourStyles } from "../styles/pages/404/styles";

interface FourZeroFourProps {}

const FourZeroFour: NextPage = ({}) => {
  return (
    <Page>
      <FourZeroFourStyles>
        <h1>Não encontrado!</h1>
      </FourZeroFourStyles>
    </Page>
  );
};
export default FourZeroFour;
