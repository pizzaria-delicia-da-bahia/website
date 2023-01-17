export interface IItem {
  price: number;
}

export interface IPizza extends IItem {
  size: string;
  flavours: Array<{ name: string; ingredients: Array<string> }>;
}
