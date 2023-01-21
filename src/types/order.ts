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
  address: IAddress;
}

export interface IAddress {
  street: string;
  number: string;
  place?: string;
  reference?: string;
  cep?: string;
}
