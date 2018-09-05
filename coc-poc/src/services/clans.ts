import * as HttpStatus from 'http-status-codes';
import { OptionsWithUri, Response } from 'request';
import * as request from 'request-promise';

import { CocApiToken, default as getBearerToken } from '../providers/coc-auth';

import { COC_HOSTNAME } from '../consts';

import { PlayerName, PlayerTag } from './players';

export const API_PATH: string = 'v1/clans';

export type ClanTag = string;
export type ClanName = string;
export type EntityLevel = number;
export type TrophyCount = number;

export interface IClanInfo {
  tag: ClanTag;
  name: ClanName;
}

export interface IClanMember {
  tag: PlayerTag;
  name: PlayerName;
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

export async function getClanMembers({ clanTag }: { clanTag: ClanTag }): Promise<IClanMember[]> {
  const options: OptionsWithUri = {
    headers: {
      Authorization: await getBearerToken(),
    },
    json: true,
    uri: `${COC_HOSTNAME}/${API_PATH}/${encodeURIComponent(clanTag)}/members`,
  };
  const { items }: { items: IClanMember[] } = await request.get(options);
  return items;
}
