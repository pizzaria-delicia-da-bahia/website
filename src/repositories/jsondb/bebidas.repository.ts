import { Repo } from "..";
import { RepoJsondb } from "./index.repository";
import { IOutro } from "@models/outro";

export class BebidasRepoJsondb extends Repo<IOutro> {
  async find(): Promise<IOutro[]> {
    return (await new RepoJsondb().get("/bebidas")) as IOutro[];
  }
  async create(data: IOutro) {
    await new RepoJsondb().post("/bebidas", { data });
  }
  async update(value: string, data: IOutro) {
    await new RepoJsondb().patch(`/bebidas`, { data, value });
  }
  async delete(value: string) {
    await new RepoJsondb().delete(`/bebidas`, { value });
  }
}
