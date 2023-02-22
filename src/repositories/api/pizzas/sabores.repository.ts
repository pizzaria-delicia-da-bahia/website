import { Repo } from "../..";
import { api } from "@config/api";
import { IPizzaSabor } from "@models/pizza";

export class SaboresRepoApi extends Repo<IPizzaSabor> {
  async find(): Promise<IPizzaSabor[]> {
    return (await api.get("/pizzas/sabores")).data as IPizzaSabor[];
  }
  async create(item: IPizzaSabor) {
    await api.post("/pizzas/sabores", item);
  }
  async update(id: string, item: IPizzaSabor) {
    await api.patch(`/pizzas/sabores?key=id&value=${id}`, item);
  }
  async delete(id: string) {
    await api.delete(`/pizzas/sabores?key=id&value=${id}`);
  }
}
