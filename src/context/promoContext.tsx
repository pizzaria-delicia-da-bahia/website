import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IPizzaTamanho } from "@models/pizza";
import { Promo } from "@models/promo";
import { env } from "@config/env";
import { IItem } from "@models/item";

const PromoContext = createContext<{
  getTaxaGratis: (itens: IItem[]) => boolean;
  getBordaGratis: (tamanho: IPizzaTamanho) => boolean;
  getDuasRefri60: () => boolean;
  promosCarregadas: boolean;
}>(null);

const PromoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [promosCarregadas, setPromosCarregadas] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const promosFromBackend = (await (
          await fetch(`${env.apiURL}/promo`, {
            headers: { "Content-Type": "application/json" },
          })
        ).json()) as Promo[];
        setPromos(promosFromBackend);
        setPromosCarregadas(true);
      } catch (err) {
        console.error((err as Error).message, (err as Error).stack);
      }
    })();
  }, []);

  const getEhDia = (promo: Promo) => {
    return promo.dias.some((x) => {
      const hoje = new Date();
      return x instanceof Date
        ? hoje === x
        : hoje
            .toLocaleDateString("pt-BR", { weekday: "long" })
            .toLowerCase()
            .includes(x);
    });
  };

  const getTaxaGratis = (itens: IItem[]) => {
    const promo = promos.find((x) => x.nome.includes("taxa-gratis"));
    if (!promo || !promo.ativa) return false;
    if (!getEhDia(promo)) return false;

    const CONDICAO =
      itens.filter((x) => x.tipo === "PIZZA").length > 0 &&
      itens.reduce((acc, item) => acc + item.valor, 0) >= 39;

    return CONDICAO;
  };

  const getBordaGratis = (tamanho: IPizzaTamanho) => {
    const promo = promos.find((x) => x.nome.includes("borda-gratis"));
    if (!promo || !promo.ativa) return false;
    if (!getEhDia(promo)) return false;
    const CONDICAO = tamanho.valorMin >= 27 && tamanho.fatias >= 6;
    return CONDICAO;
  };

  const getDuasRefri60 = () => {
    const promo = promos.find((x) => x.nome.includes("duas-refri-60"));
    if (!promo || !promo.ativa) return false;
    if (!getEhDia(promo)) return false;
    const CONDICAO = true;
    return CONDICAO;
  };

  //   const a:Omit<Promo, 'id'>[] = [
  //     {"nome": "taxa-gratis", "ativa": true, "dias":  ["terça", "tuesday", "quarta", "wednesday"]},
  //     {"nome": "borda-gratis", "ativa": true, "dias": ["quinta", "thursday", "sexta", "friday"] },
  //     {"nome": "duas-refri-60", "ativa": true, "dias":  ["sábado", "saturday", "domingo", "sunday"] },
  //   ]

  return (
    <PromoContext.Provider
      value={{
        getTaxaGratis,
        getBordaGratis,
        getDuasRefri60,
        promosCarregadas,
      }}
    >
      {children}
    </PromoContext.Provider>
  );
};
export default PromoProvider;

export const usePromo = () => {
  return useContext(PromoContext);
};
