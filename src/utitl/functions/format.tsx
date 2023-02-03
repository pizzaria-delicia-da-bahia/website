import { IPizzaTamanho, IPizzaSaborValor } from "../../types/pizza";

export const getValueString = (v: IPizzaSaborValor | null) =>
  v ? `${v.tamanhoId}: ${formatCurrency(Number(v.valor))}` : "";

export const formatCurrency = (n: number) =>
  n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
