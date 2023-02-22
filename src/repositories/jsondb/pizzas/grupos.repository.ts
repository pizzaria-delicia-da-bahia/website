import { Repo } from "../..";
import { RepoJsondb } from "../index.repository";
import { IPizzaGrupo } from "@models/pizza";

export class GruposRepoJsondb extends Repo<IPizzaGrupo> {
  async find(): Promise<IPizzaGrupo[]> {
    return (await new RepoJsondb().get("/pizzas/grupos")) as IPizzaGrupo[];
  }
  async create(data: IPizzaGrupo) {
    await new RepoJsondb().post("/pizzas/grupos", { data });
  }
  async update(value: string, data: IPizzaGrupo) {
    await new RepoJsondb().patch(`/pizzas/grupos`, { data, value });
  }
  async delete(value: string) {
    await new RepoJsondb().delete(`/pizzas/grupos`, { value });
  }
}
