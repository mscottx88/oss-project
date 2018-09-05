CREATE SEQUENCE coc.player_history_id_seq;

ALTER SEQUENCE coc.player_history_id_seq
  OWNER TO postgres;

GRANT ALL PRIVILEGES
  ON SEQUENCE coc.player_history_id_seq
  TO postgres;

