import { NextApiRequest, NextApiResponse } from "next";
import { MyRouter } from "../../../config/api/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.headers.authorization)
      throw new Error("You must provide authorization header");

    const authKey = Buffer.from(
      req.headers.authorization as string,
      "base64"
    ).toString("ascii");

    if (authKey !== (process.env.API_KEY as string))
      throw new Error("Unauthorized");

    const router = new MyRouter("/pizzas/sabores");

    if (req.method === "GET") {
      await router.get(req, res);
    } else if (req.method === "POST") {
      await router.post(req, res);
    } else if (req.method === "PATCH") {
      await router.patch(req, res);
    } else if (req.method === "DELETE") {
      await router.delete(req, res);
    }
  } catch (err) {
    console.error((err as Error).message, (err as Error).stack);
    res.status(500).send({ message: "Error" });
  }
}
