import { IGetDTO } from "../dtos";
import { Repo } from "@repositories/index";

export abstract class Service<T> {
  constructor(protected readonly repo: Repo<T>) {}
  abstract find(dto?: IGetDTO): Promise<T[] | any[] | T>;
  abstract create(item: T): void;
  abstract update(itemId: string, item: T): void;
  abstract delete(itemId: string): void;
}
