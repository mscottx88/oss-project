import { QueryResult, runQuery } from '../providers/database';

export type PlayerId = string;
export type PlayerTag = string;

export interface IPlayer {
  playerId?: PlayerId;
  playerTag: PlayerTag;
}

export async function create({ playerTag }: IPlayer): Promise<IPlayer> {
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
      player_id AS "playerId",
      player_tag as "playerTag"`;

  const result: QueryResult = await runQuery({ parameters, statement });

  return result.rows[0] as IPlayer;
}

export async function getByPlayerTag({ playerTag }: IPlayer): Promise<IPlayer> {
  const parameters: [PlayerTag] = [playerTag];

  const statement: string = `
    SELECT
      player_id AS "playerId",
      player_tag AS "playerTag"
    FROM coc.player
    WHERE (
      player_tag = $1
    )`;

  const result: QueryResult = await runQuery({ parameters, statement });

  return result.rows[0] as IPlayer;
}