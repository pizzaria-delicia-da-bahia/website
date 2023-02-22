import { IPizzaGrupo } from "@models/pizza";
import { Service } from "..";
import { v4 as uuidv4 } from "uuid";

export class GruposService extends Service<IPizzaGrupo> {
  async find(): Promise<IPizzaGrupo[]> {
    const data = ((await this.repo.find()) as IPizzaGrupo[]).sort((a, b) =>
      a.nome > b.nome ? 1 : -1
    );

    return data;
  }

  async create(item: IPizzaGrupo) {
    const id = uuidv4();
    await this.repo.create({ ...item, id });
  }
  async update(itemId: string, item: IPizzaGrupo) {
    await this.repo.update(itemId, item);
  }
  async delete(itemId: string) {
    await this.repo.delete(itemId);
  }
}
