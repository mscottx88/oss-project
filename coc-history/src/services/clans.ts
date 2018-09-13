import { QueryResult, runQuery } from '../providers/database';

export type ClanId = string;
export type ClanTag = string;
export type RegistrationType = string;

export interface IClan {
  createdAt: string;
  clanId?: ClanId;
  clanTag: ClanTag;
  registrationType: RegistrationType;
}

export interface ICreate {
  clanTag: ClanTag;
}

export async function create({ clanTag }: ICreate): Promise<IClan> {
  const parameters: [ClanTag] = [clanTag];

  const statement: string = `
    INSERT INTO coc.clan (
      clan_tag
    )
    VALUES (
      $1
    )
    ON CONFLICT (
      clan_tag
    )
    DO UPDATE
    SET
      clan_tag = EXCLUDED.clan_tag
    RETURNING
      created_at AS "createdAt",
      clan_id AS "clanId",
      clan_tag AS "clanTag",
      registration_type AS "registrationType"`;

  const result: QueryResult = await runQuery({ parameters, statement });

  return result.rows[0] as IClan;
}

export interface IGetByClanTag {
  clanTag: ClanTag;
}

export async function getByClanTag({ clanTag }: IGetByClanTag): Promise<IClan> {
  const parameters: [ClanTag] = [clanTag];

  const statement: string = `
    SELECT
      created_at AS "createdAt",
      clan_id AS "clanId",
      clan_tag AS "clanTag",
      registration_type AS "registrationType"
    FROM coc.clan
    WHERE (
      clan_tag = $1
    )`;

  const result: QueryResult = await runQuery({ parameters, statement });

  return result.rows[0] as IClan;
}
