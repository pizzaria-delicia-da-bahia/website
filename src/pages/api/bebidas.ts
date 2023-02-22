import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { env } from "@config/env";
import { BebidasController } from "@controllers/bebidas.controller";
import { BebidasRepoApi } from "@repositories/api/bebidas.repository";
import { BebidasRepoJsondb } from "@repositories/jsondb/bebidas.repository";
import { BebidasService } from "@services/bebidas.service";
import NextCors from "nextjs-cors";

const controller = new BebidasController(
  new BebidasService(
    env.repoLocation === "api" ? new BebidasRepoApi() : new BebidasRepoJsondb()
  )
);

export default async function handler(req: Request, res: Response) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  switch (req.method) {
    case "GET":
      controller.get(req, res);
      break;

    case "POST":
      controller.post(req, res);

      break;

    case "PATCH":
      controller.patch(req, res);

      break;

    case "DELETE":
      controller.delete(req, res);
      break;

    default:
      res.status(404).send({ message: "Invalid method" });
      break;
  }
}
