export abstract class Repo<T> {
	abstract find(): Promise<T[] | T>;
	abstract create(item: T): void;
	abstract update(itemId: string, item: T): void;
	abstract delete(itemId: string): void;
}
