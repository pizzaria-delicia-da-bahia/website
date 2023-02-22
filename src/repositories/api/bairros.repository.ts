import { Repo } from "..";
import { api } from "@config/api";
import { IBairro } from "@models/endereco";

export class BairrosRepoApi extends Repo<IBairro> {
  async find(): Promise<IBairro[]> {
    return (await api.get("/bairros")).data as IBairro[];
  }
  async create(item: IBairro) {
    await api.post("/bairros", item);
  }
  async update(id: string, item: IBairro) {
    await api.patch(`/bairros?key=id&value=${id}`, item);
  }
  async delete(id: string) {
    await api.delete(`/bairros?key=id&value=${id}`);
  }
}
