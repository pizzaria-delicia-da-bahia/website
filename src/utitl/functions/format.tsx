import { IPizzaTamanho, IPizzaSaborValor } from "../../types/pizza";

export const getValueString = ({
  name,
  value,
}: {
  name: string;
  value: number;
}) => `${name}: ${formatCurrency(value)}`;

export const formatCurrency = (n: number) =>
  n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
