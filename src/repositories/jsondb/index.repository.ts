import { db } from "@config/jsondb";
import { IOptions } from "./options";

export class RepoJsondb {
  get = async (url: string) => {
    return await db.getData(url);
  };

  post = async (url: string, data: any) => {
    try {
      await db.push(`${url}[]`, data, true);
    } catch (err) {
      console.error((err as Error).message, (err as Error).stack);
    }
  };

  patch = async (url: string, options: IOptions) => {
    try {
      const value = Number(options.value) ?? options.value;
      const index = await db.getIndex(url, value, options.key ?? "id");
      if (index === -1) throw new Error("Could not find index");

      await db.push(`${url}/${index}`, options.data, true);
    } catch (err) {
      console.error((err as Error).message, (err as Error).stack);
    }
  };

  delete = async (url: string, options: IOptions) => {
    try {
      const value = Number(options.value) ?? options.value;
      const index = await db.getIndex(url, value, options.key ?? "id");
      if (index === -1) throw new Error("Could not find index");

      await db.delete(`${url}[${index}]`);
    } catch (err) {
      console.error((err as Error).message, (err as Error).stack);
    }
  };
}
