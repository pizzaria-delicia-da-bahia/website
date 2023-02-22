import { env } from "@config/env";
import { NextApiRequest as Request, NextApiResponse as Response } from "next";

export const getAuth = async (req: Request, res: Response) => {
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
};
