import { createGlobalStyle, ThemeProvider } from "styled-components";
import Layout from "../components/layout";
import NavigationProvider from "../context/navigationContext";
import Globals from "../styles/globals";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavigationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NavigationProvider>
      <Globals />
    </>
  );
}
