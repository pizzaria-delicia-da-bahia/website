import { IGetDTO } from "..";

export interface ITaxaGetDTO extends IGetDTO {
  rua?: string;
  numero?: number;
  cep?: string;
  localDeEntrega?: string;
  pontoDeReferencia?: string;
  bairroId?: string;
}
