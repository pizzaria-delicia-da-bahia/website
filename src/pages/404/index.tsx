import { NextPage } from "next";
import { useRouter } from "next/router";
import Page from "../../components/page";
import { FourZeroFourStyles } from "../../styles/pages/404/styles";

const FourZeroFour: NextPage = () => {
  const router = useRouter();

  return (
    <Page>
      <FourZeroFourStyles>
        <h1 className="icon">⚠️</h1>
        <h1 className="title">Página não encontrada!</h1>
        <a href="#" onClick={() => router.back()} className="link">
          Voltar
        </a>
      </FourZeroFourStyles>
    </Page>
  );
};
export default FourZeroFour;
