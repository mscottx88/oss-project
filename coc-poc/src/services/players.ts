import * as HttpStatus from 'http-status-codes';
import { OptionsWithUri, Response } from 'request';
import * as request from 'request-promise';

import { CocApiToken, default as getBearerToken } from '../providers/coc-auth';

import { COC_HOSTNAME } from '../consts';

export const API_PATH: string = 'v1/players';

export type PlayerTag = string;
export type PlayerName = string;
export type EntityLevel = number;

export interface IPlayerInfo {
  tag: PlayerTag;
  name: PlayerName;
  townHallLevel: EntityLevel;
  townHallWeaponLevel: EntityLevel;
  expLevel: EntityLevel;
  trophies: number;
}

export async function getPlayerInfo({ playerTag }: { playerTag: PlayerTag }): Promise<IPlayerInfo> {
  const options: OptionsWithUri = {
    headers: {
      Authorization: await getBearerToken(),
    },
    json: true,
    uri: `${COC_HOSTNAME}/${API_PATH}/${encodeURIComponent(playerTag)}`,
  };
  return request.get(options);
}
