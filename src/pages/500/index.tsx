import { NextPage } from "next";
import Page from "@components/page";
import ErrorPage from "@components/errorPage";

const FiveZeroZero: NextPage = () => {
  return (
    <Page>
      <ErrorPage emoji="❕" text="Erro!" />
    </Page>
  );
};
export default FiveZeroZero;
