export interface IPizzaGrupo {
  id: string;
  nome: string;
  sabores?: Array<IPizzaSabor>;
}
export interface IPizzaSabor {
  id: string;
  nome: string;
  disponivel: boolean;
  grupoId: string;
  ingredientes: Array<string>;
  valores: Array<IPizzaSaborValor>;
}
export interface IPizzaTamanho {
  id: string;
  nome: string;
  fatias: number;
  tamanhoAprox: number;
  maxSabores: number;
  valorMin: number;
  visivel: boolean;
  ativado: boolean;
}
export interface IPizzaSaborValor {
  tamanhoId: string;
  valor: number;
}
