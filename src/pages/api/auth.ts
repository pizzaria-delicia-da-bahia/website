import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { env } from "@config/env";
import NextCors from "nextjs-cors";

export default async function handler(req: Request, res: Response) {
  await NextCors(req, res, {
    // Options
    methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === "POST") {
    try {
      let { pw } = req.body;
      if (!pw) throw new Error("Invalid password");
      pw = Buffer.from(pw).toString("ascii");
      if (pw === env.configPassword) {
        res.status(200);
      }
    } catch (e: any) {
      console.error(e["message"]);
      res.status(500).send({ message: "Invalid password" });
    }
  }
}
