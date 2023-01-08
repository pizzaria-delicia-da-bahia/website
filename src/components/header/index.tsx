import { HeaderStyle } from "./styles";
import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { PecaJaButton } from "../pecaja";

export const Header = () => {
  return (
    <HeaderStyle>
      <Logo />
      <Navigation />
      <PecaJaButton style="minimal" />
    </HeaderStyle>
  );
};
