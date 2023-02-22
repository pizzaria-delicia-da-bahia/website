import { Repo } from "..";
import { RepoJsondb } from "./index.repository";
import { IEndereco } from "@models/endereco";

export class EnderecosRepoJsondb extends Repo<IEndereco> {
  async find(): Promise<IEndereco[]> {
    return (await new RepoJsondb().get("/enderecos")) as IEndereco[];
  }
  async create(data: IEndereco) {
    await new RepoJsondb().post("/enderecos", { data });
  }
  async update(value: string, data: IEndereco) {
    await new RepoJsondb().patch(`/enderecos`, { data, value });
  }
  async delete(value: string) {
    await new RepoJsondb().delete(`/enderecos`, { value });
  }
}
