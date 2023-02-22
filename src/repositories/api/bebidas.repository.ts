import { Repo } from "..";
import { api } from "@config/api";
import { IOutro } from "@models/outro";

export class BebidasRepoApi extends Repo<IOutro> {
  async find(): Promise<IOutro[]> {
    return (await api.get("/bebidas")).data as IOutro[];
  }
  async create(item: IOutro) {
    await api.post("/bebidas", item);
  }
  async update(id: string, item: IOutro) {
    await api.patch(`/bebidas?key=id&value=${id}`, item);
  }
  async delete(id: string) {
    await api.delete(`/bebidas?key=id&value=${id}`);
  }
}
