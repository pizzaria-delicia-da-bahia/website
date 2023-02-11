import Head from "next/head";
import Layout from "../components/layout";
import NavigationProvider from "../context/navigationContext";
import Globals from "../styles/globals";
import Favicon from "../../public/favicon.ico";
import MyOrderProvider from "../context/myOrderContext";
import NotificationProvider from "../components/notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      </Head>
      <NotificationProvider>
        <NavigationProvider>
          <MyOrderProvider>
            <Layout>
              <Component {...pageProps} />
              <ToastContainer
                position="top-center"
                autoClose={2000}
                closeOnClick
                theme="colored"
              />
            </Layout>
          </MyOrderProvider>
        </NavigationProvider>
      </NotificationProvider>
      <Globals />
    </>
  );
}
