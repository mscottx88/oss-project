CREATE SEQUENCE coc.daily_info_snapshot_id_seq;

ALTER SEQUENCE coc.daily_info_snapshot_id_seq
  OWNER TO postgres;

GRANT ALL PRIVILEGES
  ON SEQUENCE coc.daily_info_snapshot_id_seq
  TO postgres;

