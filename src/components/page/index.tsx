import { useRouter } from "next/router";
import { PageStyle, PageStyleWithoutElements } from "./styles";

export default function Page({ children }) {
  const router = useRouter();
  if (["/cardapio-"].some((x) => router.pathname.includes(x)))
    return <PageStyleWithoutElements>{children}</PageStyleWithoutElements>;
  return <PageStyle>{children}</PageStyle>;
}
