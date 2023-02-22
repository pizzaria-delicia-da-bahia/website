export const env = {
  apiURL: process.env.NEXT_PUBLIC_API_URL as string,
  apiKey: process.env.API_KEY as string,

  repoApiURL: process.env.REPO_API_URL as string,
  repoApiKey: process.env.REPO_API_KEY as string,

  repoLocation: (process.env.REPO_LOCATION || "local") as "api" | "local",
  configPassword: process.env.CONFIG_PASSWORD as string,
};
