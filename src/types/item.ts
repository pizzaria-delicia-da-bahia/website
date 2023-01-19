export interface IItem {
  id: string;
  valor: number;
}
export interface IPizza extends IItem {
  tamanho: ITamanho;
  sabores: Array<ISabor>;
}
export interface ITamanho {
  nome: string;
  fatias: number;
  tamanhoAprox: number;
  maxSabores: number;
  visivel: boolean;
}
export interface IValor {
  tamanho: string;
  valor: number;
}
export interface ISabor {
  nome: string;
  ativo: boolean;
  ingredientes: Array<string>;
  valores: Array<IValor>;
}
