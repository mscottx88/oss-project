import { DEFAULT_PORT } from './consts';

const { name, version }: { name: string; version: string } = require('../package.json');

export interface IConfig {
  name: string;
  port: number;
  version: string;
}

export default function get(): IConfig {
  return {
    name,
    port: +process.env.DEFAULT_PORT || DEFAULT_PORT,
    version,
  };
}
