import { Repo } from "../..";
import { RepoJsondb } from "../index.repository";
import { IPizzaSabor } from "@models/pizza";

export class SaboresRepoJsondb extends Repo<IPizzaSabor> {
  async find(): Promise<IPizzaSabor[]> {
    return (await new RepoJsondb().get("/pizzas/sabores")) as IPizzaSabor[];
  }
  async create(data: IPizzaSabor) {
    await new RepoJsondb().post("/pizzas/sabores", { data });
  }
  async update(value: string, data: IPizzaSabor) {
    await new RepoJsondb().patch(`/pizzas/sabores`, { data, value });
  }
  async delete(value: string) {
    await new RepoJsondb().delete(`/pizzas/sabores`, { value });
  }
}
