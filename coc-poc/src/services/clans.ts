import * as HttpStatus from 'http-status-codes';
import { OptionsWithUri, Response } from 'request';
import * as request from 'request-promise';

import { CocApiToken, default as getBearerToken } from '../providers/coc-auth';

import { COC_HOSTNAME } from '../consts';

export const API_PATH: string = 'v1/clans';

export type ClanTag = string;
export type ClanName = string;
export type EntityLevel = number;
export type TrophyCount = number;

export interface IClanInfo {
  tag: ClanTag;
  name: ClanName;
}

export async function getClanInfo({ clanTag }: { clanTag: ClanTag }): Promise<IClanInfo> {
  const options: OptionsWithUri = {
    headers: {
      Authorization: await getBearerToken(),
    },
    json: true,
    uri: `${COC_HOSTNAME}/${API_PATH}/${encodeURIComponent(clanTag)}`,
  };
  return request.get(options);
}
