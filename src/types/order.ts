import { IItem } from "./item";

export interface IOrder {
  consumer: { name: string; whatsapp: string };
  address: { streetName: string; neighborhood: string };
  items: Array<IItem>;
}
