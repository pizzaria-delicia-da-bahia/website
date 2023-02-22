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

export function removeAbreviations(txt: string) {
  return txt
    .replace(/^r /g, "rua ")
    .replace(/^acesso /g, "")
    .replace(/^lad /g, "ladeira ")
    .replace(/^tv /g, "travessa ")
    .replace(/^trav /g, "travessa ")
    .replace(/^av /g, "avenida ")
    .replace(/^pc /g, "praça ")
    .replace(/^pç /g, "praça ")
    .replace(/(. +)(st +)/g, "$1 santo ")
    .replace(/(. +)(dr +)/g, "$1 doutor ")
    .replace(/(. +)(dra +)/g, "$1 doutora ");
}

export function convertOrdinals(txt: string) {
  [
    "primeira",
    "segunda",
    "terceira",
    "quarta",
    "quinta",
    "sexta",
    "setima",
    "oitava",
    "nona",
  ].forEach((x, i) => {
    const regex = new RegExp(String.raw`^(${i + 1}a|${i + 1}|${x}) `, "g");
    txt = txt.replace(regex, `${i + 1}ª `);
  });
  return txt;
}
