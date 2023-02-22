import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { IOutro } from "@models/outro";
import { Controller } from ".";
import { v4 as uuidv4 } from "uuid";

export class LanchesController extends Controller<IOutro> {
  get = async (req: Request, res: Response) => {
    try {
      const data = await this.service.find();
      res.json(data);
    } catch (e) {
      console.error(e);
      res.json({ message: "Error" });
    }
  };
  post = async (req: Request, res: Response) => {
    try {
      const id = uuidv4();
      const item = req.body as IOutro;
      await this.service.create({ ...item, id });
      res.status(200);
    } catch (e) {
      console.error(e);
      res.status(500).send("Não foi possível salvar");
    }
  };
  patch = async (req: Request, res: Response) => {
    try {
      const itemId = req.query.id as string;
      const item = req.body as IOutro;
      await this.service.update(itemId, item);
      res.status(200);
    } catch (e) {
      console.error(e);
      res.status(500).send("Não foi possível salvar");
    }
  };
  delete = async (req: Request, res: Response) => {
    try {
      const itemId = req.query.id as string;
      await this.service.delete(itemId);
      res.status(200);
    } catch (e) {
      console.error(e);
      res.status(500).send("Não foi possível salvar");
    }
  };
}
