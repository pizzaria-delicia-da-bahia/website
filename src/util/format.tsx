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

export const removeAccents = (txt: string) => {
  const r = String(txt)
    .replace(/[ÀÁÂÃÄÅ]/g, "A")
    .replace(/[Ç]/g, "C")
    .replace(/[ÈÉÊË]/g, "E")
    .replace(/[ÌÍÎÏ]/g, "I")
    .replace(/[ÒÓÔÕÖ]/g, "O")
    .replace(/[ÙÚÛÜ]/g, "U")

    .replace(/[àáâãäå]/g, "a")
    .replace(/[ç]/g, "c")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .trim();
  return r;
};
