import { convertOrdinals, removeAbreviations, removeAccents } from "../format";

export function formatAddressFirst(txt: string) {
  return String(txt)
    .toLowerCase()
    .replace(/[^a-z\s,0-9]/g, "")
    .replace(/ do | da | de | di /g, " ");
}

export function formatAddressAfter(txt: string) {
  return txt.replace(/\s\s/g, " ").toUpperCase().split(", ")[0];
}

export const clearAddress = (street: string) => {
  if (!street) return "";
  return formatAddressAfter(
    convertOrdinals(
      removeAbreviations(removeAccents(formatAddressFirst(street)))
    )
  );
};
