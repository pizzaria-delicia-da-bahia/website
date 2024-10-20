import { IPedido } from "@models/order";

export const taxaGratisAteTalHoras = (order: IPedido) => {
  const dataPromo = new Date("2024-10-18 20:05:00");

  const now = new Date();

  return (
    dataPromo.getTime() > now.getTime() &&
    order.itens.reduce((acc, curr) => acc + curr.valor, 0) >= 36
  );
};
