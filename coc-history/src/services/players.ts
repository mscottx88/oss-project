import { QueryResult, runQuery } from '../providers/database';

export type PlayerId = string;
export type PlayerTag = string;
export type RegistrationType = string;

export interface IPlayer {
  createdAt: string;
  playerId?: PlayerId;
  playerTag: PlayerTag;
  registrationType: RegistrationType;
}

export interface ICreate {
  playerTag: PlayerTag;
}

export async function create({ playerTag }: ICreate): Promise<IPlayer> {
  const parameters: [PlayerTag] = [playerTag];

  const statement: string = `
    INSERT INTO coc.player (
      player_tag
    )
    VALUES (
      $1
    )
    ON CONFLICT (
      player_tag
    )
    DO UPDATE
    SET
      player_tag = EXCLUDED.player_tag
    RETURNING
      created_at AS "createdAt",
      player_id AS "playerId",
      player_tag AS "playerTag",
      registration_type AS "registrationType"`;

  const result: QueryResult = await runQuery({ parameters, statement });

  return result.rows[0] as IPlayer;
}

export interface IGetByPlayerTag {
  playerTag: PlayerTag;
}

export async function getByPlayerTag({ playerTag }: IGetByPlayerTag): Promise<IPlayer> {
  const parameters: [PlayerTag] = [playerTag];

  const statement: string = `
    SELECT
      created_at AS "createdAt",
      player_id AS "playerId",
      player_tag AS "playerTag",
      registration_type AS "registrationType"
    FROM coc.player
    WHERE (
      player_tag = $1
    )`;

  const result: QueryResult = await runQuery({ parameters, statement });

  return result.rows[0] as IPlayer;
}
