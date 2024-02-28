import Head from "next/head";
import Layout from "@components/layout";
import NavigationProvider from "@context/navigationContext";
import Globals from "@styles/globals";
import Favicon from "../../public/favicon.ico";
import MyOrderProvider from "@context/myOrderContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PromoProvider from "@context/promoContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={Favicon.src} />
        <title>Pizzaria Delicia da Bahia - a melhor de Salvador</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content={`Pizzaria Delicia da Bahia,
            desde 2013, servindo as pizzas mais
            deliciosas de Salvador!`}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
      </Head>
      <NavigationProvider>
        <MyOrderProvider>
          <PromoProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              closeOnClick
              theme="colored"
              className="toast"
            />
          </PromoProvider>
        </MyOrderProvider>
      </NavigationProvider>
      <Globals />
    </>
  );
}
