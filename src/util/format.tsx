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

import { informacoesLocais } from "./local";
import { startsWith } from "./misc";

export function formatNumber(valor: string) {
  return valor.replace(/[^0-9]/gi, "");
}

export function formatPhoneNumber(
  valor: string,
  manterDDD: boolean = true,
  manterDDI: boolean = true
) {
  let novoValor = valor;

  // Remove the Country code BRASILEIRO.
  novoValor = novoValor.replace("+55", "");

  //Se o Country code não for Brasileiro, retorna o número sem formatação.
  if (startsWith(novoValor, ["+", "0800"])) return novoValor;

  //Remove qualquer caracter especial
  novoValor = formatNumber(novoValor);

  //Remove o primeiro caracter caso o mesmo seja "0"
  if (novoValor[0] === "0") novoValor = novoValor.substring(1);

  let _ddd, _num, _ddi;
  _ddi = informacoesLocais.DDI + " ";
  _ddd = informacoesLocais.DDD + " ";

  switch (novoValor.length) {
    case 11: //00 90000-0000
      _ddd = novoValor.slice(0, 2) + " ";
      _num = novoValor.slice(2, 7) + "-" + novoValor.slice(7);
      break;
    case 10: //00 0000-0000
      _ddd = novoValor.slice(0, 2) + " ";
      _num = novoValor.slice(2, 6) + "-" + novoValor.slice(6);
      _num = startsWith(_num, ["9", "8", "7", "6", "1"]) ? "9" + _num : _num;
      break;
    case 9: //90000-0000
      _num = novoValor.slice(0, 5) + "-" + novoValor.slice(5);
      break;
    case 8: //0000-0000
      _num = novoValor.slice(0, 4) + "-" + novoValor.slice(4);
      _num = startsWith(_num, ["9", "8", "7", "6", "1"]) ? "9" + _num : _num;
      break;
    default:
      _ddi = "";
      _ddd = "";
      _num = valor;
      break;
  }

  _ddi = manterDDI ? _ddi : "";
  _ddd = manterDDD || _ddd !== informacoesLocais.DDD ? _ddd : "";

  novoValor = _ddi + _ddd + _num;
  return novoValor;
}
