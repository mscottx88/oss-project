export type CocApiToken = string;

let token: CocApiToken;

export function setConfig(config: { token: CocApiToken }): void {
  ({ token } = config);
}

export default async function getBearerToken(): Promise<CocApiToken> {
  return `Bearer ${process.env.COC_API_TOKEN}`;
}
