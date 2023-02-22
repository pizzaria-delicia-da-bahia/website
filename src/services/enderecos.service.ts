import { Service } from ".";
import { v4 as uuidv4 } from "uuid";
import { IEndereco } from "@models/endereco";
import { IEnderecosGetDTO } from "@dtos/enderecos/get";

export class EnderecosService extends Service<IEndereco> {
  async find({ cep }: IEnderecosGetDTO): Promise<IEndereco[]> {
    if (cep) cep = cep.replace(/[^0-9]/g, "");

    const data = ((await this.repo.find()) as IEndereco[])
      .filter((e) => (cep ? e.cep === cep : true))
      .sort((a, b) => (a.rua > b.rua ? 1 : -1))
      .sort((a, b) => (a.taxa > b.taxa ? 1 : -1));

    return data;
  }

  async create(item: IEndereco) {
    const id = uuidv4();
    await this.repo.create({ ...item, id });
  }
  async update(itemId: string, item: IEndereco) {
    await this.repo.update(itemId, item);
  }
  async delete(itemId: string) {
    await this.repo.delete(itemId);
  }
}
