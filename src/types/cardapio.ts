import { ITamanho } from "./item";

export interface ICardapio {
  sizes: Array<ITamanho>;
  groupsLeft: Array<IGrupo>;
  groupsRight: Array<IGrupo>;
}

export interface IGrupo {
  nome: string;
  sabores: Array<ISabor>;
}
