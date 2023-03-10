import { Footer } from "../footer";
import { Header } from "../header";
import Page from "../page";
import { LayoutStyle } from "./styles";

export default function Layout({ children }) {
  return (
    <LayoutStyle>
      <Header />
      <Page>{children}</Page>
      <Footer />
    </LayoutStyle>
  );
}
