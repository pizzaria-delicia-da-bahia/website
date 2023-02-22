import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { env } from "@config/env";
import { EnderecosController } from "@controllers/enderecos.controller";
import { EnderecosRepoApi } from "@repositories/api/enderecos.repository";
import { EnderecosRepoJsondb } from "@repositories/jsondb/enderecos.repository";
import { EnderecosService } from "@services/enderecos.service";
import NextCors from "nextjs-cors";

const controller = new EnderecosController(
  new EnderecosService(
    env.repoLocation === "api"
      ? new EnderecosRepoApi()
      : new EnderecosRepoJsondb()
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
