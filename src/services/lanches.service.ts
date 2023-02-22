import { IOutro } from "@models/outro";
import { Service } from ".";
import { v4 as uuidv4 } from "uuid";
import { Repo } from "@repositories/index";

export class LanchesService extends Service<IOutro> {
  constructor(repo: Repo<IOutro>) {
    super(repo);
  }
  async find(): Promise<IOutro[]> {
    const data = ((await this.repo.find()) as IOutro[]).sort((a, b) =>
      a.nome > b.nome ? 1 : -1
    );
    return data;
  }

  async create(item: IOutro) {
    const id = uuidv4();
    await this.repo.create({ ...item, id });
  }
  async update(itemId: string, item: IOutro) {
    await this.repo.update(itemId, item);
  }
  async delete(itemId: string) {
    await this.repo.delete(itemId);
  }
}
