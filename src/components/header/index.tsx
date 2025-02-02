import { HeaderStyle } from "./styles";
import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { PecaJaButton } from "../pecaja";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  if (["/cardapio-"].some((x) => router.pathname.includes(x))) return <></>;
  return (
    <HeaderStyle>
      <Logo />
      <Navigation />
      <PecaJaButton style="minimal" />
    </HeaderStyle>
  );
};
