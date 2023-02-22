import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { Controller } from ".";
import { ITaxaGetDTO } from "@dtos/taxa/get";
import { Service } from "@services/index";
import { IEndereco } from "@models/endereco";

export class TaxaController extends Controller<IEndereco | null> {
  constructor(protected service: Service<IEndereco | null>) {
    super(service);
  }
  get = async (req: Request, res: Response) => {
    try {
      const data = await this.service.find(req.query as ITaxaGetDTO);
      res.json(data);
    } catch (e) {
      console.error(e);
      res.json({ message: "Error" });
    }
  };
  post = (req: Request, res: Response) => {};

  patch = async (req: Request, res: Response) => {
    res.status(500).send("Não foi possível salvar");
  };
  delete = async (req: Request, res: Response) => {
    res.status(500).send("Não foi possível salvar");
  };
}
