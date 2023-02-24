import { NextPage } from "next";
import Page from "@components/page";
import ErrorPage from "@components/errorPage";

const FourZeroFour: NextPage = () => {
  return (
    <Page>
      <ErrorPage emoji="⚠️" text="Página não encontrada!" />
    </Page>
  );
};
export default FourZeroFour;
