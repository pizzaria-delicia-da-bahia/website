import { NextApiRequest, NextApiResponse } from "next";
import { db } from "./db";

export class MyRouter {
  constructor(private url: string) {}

  get = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await db.getData(this.url);
    res.send(data);
  };

  post = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const data = req.body;
      await db.push(`${this.url}[]`, data, true);
      db.save();
      res.status(200);
    } catch (err) {
      res.status(500);
      console.error((err as Error).message, (err as Error).stack);
    }
  };

  patch = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      let { value, key } = req.query as { value: string | number; key: string };
      const data = req.body;

      value = Number(value) ? Number(value) : value;
      const index = await db.getIndex(this.url, value, key);
      if (index === -1) throw new Error("Could not find index");

      await db.push(`${this.url}/${index}`, data, true);
      db.save();
      res.status(200);
    } catch (err) {
      res.status(500);
      console.error((err as Error).message, (err as Error).stack);
    }
  };

  delete = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      let { value, key } = req.query as { value: string | number; key: string };

      value = Number(value) ? Number(value) : value;
      const index = await db.getIndex(this.url, value, key);
      if (index === -1) throw new Error("Could not find index");

      await db.delete(`${this.url}[${index}]`);

      db.save();
      res.status(200);
    } catch (err) {
      res.status(500);
      console.error((err as Error).message, (err as Error).stack);
    }
  };
}
