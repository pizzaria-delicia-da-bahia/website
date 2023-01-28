import { IItem } from "./item";

export interface IOrder {
  date: Date;
  customer: ICustomer;
  fee: number;
  type: EOrderType | null;
  items: Array<IItem>;
  payments: Array<IPayment>;
}

export interface IPayment {
  id: string;
  type: "cash" | "pix" | "card";
  value: number;
  changeFor: number;
}

export enum EOrderType {
  "withdraw",
  "delivery",
}
export interface ICustomer {
  name: string;
  whatsapp: string;
  address: ICustomerAddress;
}

export interface ICustomerAddress extends Omit<IAddress, "fee" | "cep"> {
  number: string;
  place?: string;
  reference?: string;
  cep?: string;
}
export interface IAddress {
  street: string;
  cep: string;
  neighbourhood: { id: number; name: string };
  fee: number;
}
export interface INeighbourhood {
  id: number;
  nome: string;
}
