import { IPizzaGrupo, IPizzaTamanho } from "./pizza";

export interface ICardapio {
  size?: IPizzaTamanho | null;
  sizes?: Array<IPizzaTamanho>;
  groupsLeft: Array<IPizzaGrupo>;
  groupsRight: Array<IPizzaGrupo>;
}
