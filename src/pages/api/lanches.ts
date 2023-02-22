import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { env } from "@config/env";
import { LanchesController } from "@controllers/lanches.controller";
import { LanchesRepoApi } from "@repositories/api/lanches.repository";
import { LanchesRepoJsondb } from "@repositories/jsondb/lanches.repository";
import { LanchesService } from "@services/lanches.service";
import NextCors from "nextjs-cors";

const controller = new LanchesController(
  new LanchesService(
    env.repoLocation === "api" ? new LanchesRepoApi() : new LanchesRepoJsondb()
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
