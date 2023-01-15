import { NextPage } from "next";
import Link from "next/link";
import type { FC } from "react";
import Page from "../components/page";
import { FourZeroFourStyles } from "../styles/pages/404/styles";

interface FourZeroFourProps {}

const FourZeroFour: NextPage = ({}) => {
  return (
    <Page>
      <FourZeroFourStyles>
        <h1 className="icon">⚠️</h1>
        <h1 className="title">Página não encontrada!</h1>
        <Link href={"/home"} passHref>
          <a className="link">Voltar</a>
        </Link>
      </FourZeroFourStyles>
    </Page>
  );
};
export default FourZeroFour;
