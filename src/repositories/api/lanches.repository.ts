import { Repo } from "..";
import { api } from "@config/api";
import { IOutro } from "@models/outro";

export class LanchesRepoApi extends Repo<IOutro> {
  async find(): Promise<IOutro[]> {
    return (await api.get("/lanches")).data as IOutro[];
  }
  async create(item: IOutro) {
    await api.post("/lanches", item);
  }
  async update(id: string, item: IOutro) {
    await api.patch(`/lanches?key=id&value=${id}`, item);
  }
  async delete(id: string) {
    await api.delete(`/lanches?key=id&value=${id}`);
  }
}
