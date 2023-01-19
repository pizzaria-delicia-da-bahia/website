import { ITamanho, IValor } from "../../types/item";

export const getValueString = (v: IValor | null) =>
  v ? `${v.tamanho}: ${formatCurrency(Number(v.valor))}` : "";

export const formatCurrency = (n: number) =>
  n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
