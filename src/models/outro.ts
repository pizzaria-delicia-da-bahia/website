import { IItem } from "./item";

export interface IOutro extends IItem {
  id: string;
  nome: string;
  disponivel: boolean;
  imagemUrl: string;
  visivel: boolean;
  vendidos: number;
}
