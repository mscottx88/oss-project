import { QueryResult, runQuery } from '../providers/database';

export type HistoryMetricId = string;
export type MetricName = string;

export interface IHistoryMetric {
  historyMetricId?: HistoryMetricId;
  metricName: MetricName;
}

export async function create({ metricName }: IHistoryMetric): Promise<IHistoryMetric> {
  const parameters: [MetricName] = [metricName];

  const statement: string = `
    INSERT INTO coc.history_metric (
      metric_name
    )
    VALUES (
      $1
    )
    ON CONFLICT (
      metric_name
    )
    DO UPDATE
    SET
      metric_name = EXCLUDED.metric_name
    RETURNING
      history_metric_id AS "historyMetricId",
      metric_name as "metricName"`;

  const result: QueryResult = await runQuery({ parameters, statement });

  return result.rows[0] as IHistoryMetric;
}
