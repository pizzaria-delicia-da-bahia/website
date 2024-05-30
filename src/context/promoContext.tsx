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
import { IItem, IPizza } from "@models/item";
import { removeAccents } from "@util/format";

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
  function isValidDate(date) {
    return (
      date &&
      Object.prototype.toString.call(date) === "[object Date]" &&
      !isNaN(date)
    );
  }
  const getEhDia = (promo: Promo) => {
    return promo.dias.some((x) => {
      const hoje = new Date();
      const _x = new Date(x);
      hoje.setHours(16, 0, 0, 0);

      const p = removeAccents(
        hoje.toLocaleDateString("pt-BR", { weekday: "long" }).toLowerCase()
      );

      let r = false;

      if (typeof _x === "object") {
        _x.setHours(16, 0, 0, 0);
        r = hoje.toString() === _x.toString();
      } else {
        r = p.includes(removeAccents((x as string).toLowerCase()));
      }

      return r;
    });
  };

  const getTaxaGratis = (itens: IItem[]) => {
    if (getDuasRefri60()) return false;
    const promo = promos.find((x) => x.nome.includes("taxa-gratis"));
    if (!promo || !promo.ativa) return false;
    if (!getEhDia(promo)) return false;

    const pizzas = itens.filter((x) => x.tipo === "PIZZA") as IPizza[];
    const CONDICAO =
      pizzas.length > 0 &&
      pizzas.some((x) => x.tamanho.valorMin >= 27 && x.tamanho.fatias >= 8);

    return CONDICAO;
  };

  const getBordaGratis = (tamanho: IPizzaTamanho) => {
    if (getDuasRefri60()) return false;
    const promo = promos.find((x) => x.nome.includes("borda-gratis"));
    if (!promo || !promo.ativa) return false;
    if (!getEhDia(promo)) return false;
    const CONDICAO = tamanho.valorMin >= 27 && tamanho.fatias >= 6;
    return CONDICAO;
  };

  const getDuasRefri60 = () => {
    const promo = promos.find((x) => x.nome.includes("duas-refri-60"));
    if (!promo || !promo.ativa) return false;
    console.log(promo);
    const ehDia = getEhDia(promo);
    console.log(ehDia);
    if (!ehDia) return false;

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
