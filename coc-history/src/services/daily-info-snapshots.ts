import { QueryResult, runQuery } from '../providers/database';

import { ClanId } from './clans';
import { PlayerId } from './players';

export type DailyInfoSnapshotId = string;
export type SnapshotType = string;

export interface IDailyInfoSnapshot {
  clanId: ClanId;
  cocResponse: object;
  createdAt: string;
  dailyInfoSnapshotId: DailyInfoSnapshotId;
  playerId: PlayerId;
  snapshotDate: string;
  snapshotType: SnapshotType;
}

export interface ICreate {
  clanId: ClanId;
  cocResponse: object;
  playerId: PlayerId;
  snapshotDate: string;
  snapshotType: SnapshotType;
}

export async function create({
  clanId,
  cocResponse,
  playerId,
  snapshotDate,
  snapshotType,
}: ICreate): Promise<IDailyInfoSnapshot> {
  const parameters: [ClanId, object, PlayerId, string, SnapshotType] = [
    clanId,
    cocResponse,
    playerId,
    snapshotDate,
    snapshotType,
  ];

  const statement: string = `
    INSERT INTO coc.daily_info_snapshot (
      clan_id,
      coc_response,
      player_id,
      snapshot_date,
      snapshot_type
    )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5
    )
    RETURNING
      clan_id AS "clanId",
      created_at AS "createdAt",
      coc_response AS "cocResponse",
      daily_info_snapshot_id AS "dailyInfoSnapshotId",
      player_id AS "playerId",
      snapshot_date AS "snapshotDate",
      snapshot_type AS "snapshotType"`;

  const result: QueryResult = await runQuery({ parameters, statement });

  return result.rows[0] as IDailyInfoSnapshot;
}
