import { Repo } from "../..";
import { api } from "@config/api";
import { IPizzaTamanho } from "@models/pizza";

export class TamanhosRepoApi extends Repo<IPizzaTamanho> {
  async find(): Promise<IPizzaTamanho[]> {
    return (await api.get("/pizzas/tamanhos")).data as IPizzaTamanho[];
  }
  async create(item: IPizzaTamanho) {
    await api.post("/pizzas/tamanhos", item);
  }
  async update(id: string, item: IPizzaTamanho) {
    await api.patch(`/pizzas/tamanhos?key=id&value=${id}`, item);
  }
  async delete(id: string) {
    await api.delete(`/pizzas/tamanhos?key=id&value=${id}`);
  }
}
