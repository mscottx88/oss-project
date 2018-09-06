CREATE SEQUENCE coc.history_metric_id_seq;

ALTER SEQUENCE coc.history_metric_id_seq
  OWNER TO postgres;

GRANT ALL PRIVILEGES
  ON SEQUENCE coc.history_metric_id_seq
  TO postgres;

