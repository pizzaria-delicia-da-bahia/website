import { Repo } from "..";
import { RepoJsondb } from "./index.repository";
import { IBairro } from "@models/endereco";

export class BairrosRepoJsondb extends Repo<IBairro> {
  async find(): Promise<IBairro[]> {
    return (await new RepoJsondb().get("/bairros")) as IBairro[];
  }
  async create(data: IBairro) {
    await new RepoJsondb().post("/bairros", { data });
  }
  async update(value: string, data: IBairro) {
    await new RepoJsondb().patch(`/bairros`, { data, value });
  }
  async delete(value: string) {
    await new RepoJsondb().delete(`/bairros`, { value });
  }
}
