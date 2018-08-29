import { DEFAULT_PORT } from './consts';
import { CocApiToken } from './providers/coc-auth';

const { name, version }: { name: string; version: string } = require('../package.json');

export interface IConfig {
  name: string;
  port: number;
  token: CocApiToken;
  version: string;
}

export default function get(): IConfig {
  return {
    name,
    port: +process.env.DEFAULT_PORT || DEFAULT_PORT,
    token: process.env.COC_API_TOKEN,
    version,
  };
}
