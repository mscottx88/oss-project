DROP TABLE IF EXISTS coc.player_history;

CREATE TABLE coc.player_history (
  player_history_id BIGINT NOT NULL PRIMARY KEY DEFAULT NEXTVAL('coc.player_history_id_seq'),
  player_id BIGINT NOT NULL
    REFERENCES coc.player
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  history_metric_id BIGINT NOT NULL
    REFERENCES coc.history_metric
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  history_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  metric_numeric_value NUMERIC,
  metric_integral_value BIGINT
);
