import { Repo } from "..";
import { api } from "@config/api";
import { IEndereco } from "@models/endereco";

export class EnderecosRepoApi extends Repo<IEndereco> {
  async find(): Promise<IEndereco[]> {
    return (await api.get("/enderecos")).data as IEndereco[];
  }
  async create(item: IEndereco) {
    await api.post("/enderecos", item);
  }
  async update(id: string, item: IEndereco) {
    await api.patch(`/enderecos?key=id&value=${id}`, item);
  }
  async delete(id: string) {
    await api.delete(`/enderecos?key=id&value=${id}`);
  }
}
