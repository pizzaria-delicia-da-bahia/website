export interface IEndereco {
  id: string;
  rua: string;
  cep: string;
  bairroId: string;
  taxa: number;
}
export interface IBairro {
  id: string;
  nome: string;
}
