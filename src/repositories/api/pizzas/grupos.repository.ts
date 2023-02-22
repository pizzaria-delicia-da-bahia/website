import { Repo } from "../..";
import { api } from "@config/api";
import { IPizzaGrupo } from "@models/pizza";

export class GruposRepoApi extends Repo<IPizzaGrupo> {
  async find(): Promise<IPizzaGrupo[]> {
    return (await api.get("/pizzas/grupos")).data as IPizzaGrupo[];
  }
  async create(item: IPizzaGrupo) {
    await api.post("/pizzas/grupos", item);
  }
  async update(id: string, item: IPizzaGrupo) {
    await api.patch(`/pizzas/grupos?key=id&value=${id}`, item);
  }
  async delete(id: string) {
    await api.delete(`/pizzas/grupos?key=id&value=${id}`);
  }
}
