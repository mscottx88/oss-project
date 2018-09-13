import { QueryResult, runQuery } from '../providers/database';

import { HistoryMetricId } from './history-metric';
import { PlayerId } from './player';

export type HistoryTimestamp = string;
export type MetricIntegralValue = number;
export type MetricNumericValue = number;
export type PlayerHistoryId = string;

export interface IPlayerHistory {
  historyMetricId: HistoryMetricId;
  historyTimestamp: HistoryTimestamp;
  metricIntegralValue: MetricIntegralValue;
  metricNumericValue: MetricNumericValue;
  playerHistoryId?: PlayerHistoryId;
  playerId: PlayerId;
}

export async function create({
  historyMetricId,
  historyTimestamp,
  metricIntegralValue,
  metricNumericValue,
  playerId,
}: IPlayerHistory): Promise<IPlayerHistory> {
  const parameters: [
    HistoryMetricId,
    HistoryTimestamp,
    MetricIntegralValue,
    MetricNumericValue,
    PlayerId
  ] = [historyMetricId, historyTimestamp, metricIntegralValue, metricNumericValue, playerId];

  const statement: string = `
    INSERT INTO coc.player_history (
      history_metric_id,
      history_timestamp,
      metric_integral_value,
      metric_numeric_value,
      player_id
    )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5
    )
    RETURNING
      history_metric_id AS "historyMetricId",
      history_timestamp AS "historyTimestamp",
      metric_integral_value AS "metricIntegralValue",
      metric_numeric_value AS "metricNumericValue",
      player_history_id AS "playerHistoryId",
      player_id AS "playerId"`;

  const result: QueryResult = await runQuery({ parameters, statement });

  return result.rows[0] as IPlayerHistory;
}
