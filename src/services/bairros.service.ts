import { IBairro } from "@models/endereco";
import { Service } from ".";
import { v4 as uuidv4 } from "uuid";
import { IBairrosGetDTO } from "@dtos/bairros/get";

export class BairrosService extends Service<IBairro> {
  async find({ id }: IBairrosGetDTO): Promise<IBairro[]> {
    const data = ((await this.repo.find()) as IBairro[])
      .filter((e) => (id ? e.id === id : true))
      .sort((a, b) => (a.nome > b.nome ? 1 : -1));
    return data;
  }

  async create(item: IBairro) {
    const id = uuidv4();
    await this.repo.create({ ...item, id });
  }
  async update(itemId: string, item: IBairro) {
    await this.repo.update(itemId, item);
  }
  async delete(itemId: string) {
    await this.repo.delete(itemId);
  }
}
