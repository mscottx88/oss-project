DROP TABLE IF EXISTS coc.history_metric;

CREATE TABLE coc.history_metric (
  history_metric_id BIGINT NOT NULL PRIMARY KEY DEFAULT NEXTVAL('coc.history_metric_id_seq'),
  metric_name TEXT NOT NULL UNIQUE
);
