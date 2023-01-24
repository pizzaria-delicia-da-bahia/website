import { ISabor, ITamanho } from "./item";

export interface ICardapio {
  size?: ITamanho | null;
  sizes?: Array<ITamanho>;
  groupsLeft: Array<IGrupo>;
  groupsRight: Array<IGrupo>;
}

export interface IGrupo {
  nome: string;
  sabores: Array<ISabor>;
}
