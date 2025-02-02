import { env } from "@config/env";

export const getWorkingTime = async () => {
  return (await (await fetch(`${env.apiURL}/horarios`)).json()) ?? [];
};
