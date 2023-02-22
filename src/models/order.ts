import { IEndereco } from "./endereco";
import { IItem } from "./item";

export interface IPedido {
  data: Date;
  cliente: ICLiente;
  taxaEntrega: number;
  tipo: "retirada" | "entrega" | null;
  itens: Array<IItem>;
  pagamentos: Array<IPagamento>;
}

export interface IPagamento {
  id: string;
  tipo: "especie" | "pix" | "cartao";
  valor: number;
  trocoPara: number;
}

export interface ICLiente {
  nome: string;
  whatsapp: string;
  endereco: IEnderecoCliente;
}

export interface IEnderecoCliente
  extends Omit<IEndereco, "taxa" | "cep" | "id"> {
  numero: string;
  localDeEntrega?: string;
  pontoDeReferencia?: string;
  cep?: string;
}
