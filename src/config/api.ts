import axios from "axios";
import { env } from "@config/env";

export const api = axios.create({
  baseURL: env.repoApiURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: Buffer.from(env.repoApiKey).toString("base64"),
  },
});
