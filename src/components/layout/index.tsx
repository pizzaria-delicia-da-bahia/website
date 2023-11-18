import { useNavigation } from "@context/navigationContext";
import { Footer } from "../footer";
import {useEffect, useState} from 'react'
import { Header } from "../header";
import Page from "../page";
import { LayoutStyle } from "./styles";
import { GetServerSideProps } from "next";
import { env } from "@config/env";

export default function Layout({ children }) {
  const { modalPromo } = useNavigation();
  const [isLoaded, setIsLoaded] = useState(false)
  const [closedUntil, setClosedUntil] = useState(undefined)

  useEffect(() => {
      getClosedUntil()
  }, [])

  const getClosedUntil = async () => {
    const { closedUntil: _closedUntil } = 
    (await (await fetch(`${env.apiURL}/loja`)).json()) ?? {closedUntil: null};
    setClosedUntil(_closedUntil ?? null)  
    setIsLoaded(true)
  }
  return (
    <LayoutStyle>
      <Header />
      <Page>{children}</Page>
      <Footer />
      
      {!isLoaded || (closedUntil && new Date(closedUntil) > new Date()) ? <></> : modalPromo}
    </LayoutStyle>
  );
}