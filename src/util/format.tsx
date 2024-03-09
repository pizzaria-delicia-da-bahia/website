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

// function formatPhoneNumber(
//   valor,
//   manterDDD,
//   manterDDI = false,
//   manter9 = true
// ) {
//   if (!valor) return ''
//   // Remove the Country code
//   valor = valor.replace('+55', '')
//   valor =
//     valor.startsWith('55') && valor.length > 11
//       ? valor.replace(/^(55)/, '')
//       : valor
//   if (valor.startsWith('+')) return valor

//   valor = valor.slice(0, 1) === '0' ? valor.slice(1, valor.length) : valor
//   valor = formatNumber(valor)
//   let _ddd, _num, _ddi
//   _ddi = manterDDI ? '+55' : ''
//   const nove = manter9 ? '9' : ''
//   switch (valor.length) {
//     case 11: //00 90000-0000
//       _ddd = valor.slice(0, 2)
//       _ddd = manterDDD === true || _ddd !== MyDDD ? _ddd + ' ' : ''
//       _num = nove + valor.slice(3, 7) + '-' + valor.slice(7)
//       break
//     case 10: //00 0000-0000
//       _ddd = valor.slice(0, 2)
//       _ddd = manterDDD === true || _ddd !== MyDDD ? _ddd + ' ' : ''
//       _num = nove + valor.slice(2, 6) + '-' + valor.slice(6)
//       break
//     case 9: //90000-0000
//       _ddd = manterDDD === true ? MyDDD + ' ' : ''
//       _num = nove + valor.slice(1, 5) + '-' + valor.slice(5)
//       break
//     case 8: //0000-0000
//       _ddd = manterDDD === true ? MyDDD + ' ' : ''
//       _num = nove + valor.slice(0, 4) + '-' + valor.slice(4)
//       break
//     default:
//       _ddd = ''
//       _num = valor
//       break
//   }

//   valor = _ddi + _ddd + _num
//   return valor
// }

export const formatRua = (rua: string) => {
  return rua
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .replace("LAD", "LADEIRA")
    .replace("AV", "AVENIDA")
    .replace(/\b(R)\b/g, "RUA")
    .replace(/\b(DR)\b/g, "DOUTOR")
    .replace(/\b(LADEIRA DO ZOOLOGICO)\b/g, "LADEIRA DO JARDIM ZOOLOGICO")
    .replace(/\b(MANUEL RANGEL)\b/g, "MANOEL RANGEL")
    .replace(/\b(BIAO)\b/g, "TRAVESSA ASSEMBLEIA DE DEUS")
    .replace(/\s\s/g, " ")
    .trim();
};

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

export function formatCEP(txt: string) {
  const valor = txt.replace(/[^0-9]/g, "");
  if (valor.length === 8) {
    return `${valor.slice(0, 5)}-${valor.slice(5, 8)}`;
  } else {
    return valor;
  }
}
