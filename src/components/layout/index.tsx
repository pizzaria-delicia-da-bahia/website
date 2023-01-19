import { useEffect, useState } from "react";
import { Footer } from "../footer";
import { Header } from "../header";
import Page from "../page";
import { LayoutStyle } from "./styles";

export default function Layout({ children }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;
  return (
    <LayoutStyle>
      <Header />
      <Page>{children}</Page>
      <Footer />
    </LayoutStyle>
  );
}
