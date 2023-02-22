import { Repo } from "..";
import { RepoJsondb } from "./index.repository";
import { IOutro } from "@models/outro";

export class LanchesRepoJsondb extends Repo<IOutro> {
  async find(): Promise<IOutro[]> {
    return (await new RepoJsondb().get("/lanches")) as IOutro[];
  }
  async create(data: IOutro) {
    await new RepoJsondb().post("/lanches", { data });
  }
  async update(value: string, data: IOutro) {
    await new RepoJsondb().patch(`/lanches`, { data, value });
  }
  async delete(value: string) {
    await new RepoJsondb().delete(`/lanches`, { value });
  }
}
