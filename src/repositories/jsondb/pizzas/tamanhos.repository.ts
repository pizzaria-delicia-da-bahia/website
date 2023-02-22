import { Repo } from "../..";
import { RepoJsondb } from "../index.repository";
import { IPizzaTamanho } from "@models/pizza";

export class TamanhosRepoJsondb extends Repo<IPizzaTamanho> {
  async find(): Promise<IPizzaTamanho[]> {
    const data = (await new RepoJsondb().get(
      "/pizzas/tamanhos"
    )) as IPizzaTamanho[];
    return data;
  }
  async create(data: IPizzaTamanho) {
    await new RepoJsondb().post("/pizzas/tamanhos", { data });
  }
  async update(value: string, data: IPizzaTamanho) {
    await new RepoJsondb().patch(`/pizzas/tamanhos`, { data, value });
  }
  async delete(value: string) {
    await new RepoJsondb().delete(`/pizzas/tamanhos`, { value });
  }
}
