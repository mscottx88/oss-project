CREATE SEQUENCE coc.player_id_seq;

ALTER SEQUENCE coc.player_id_seq
  OWNER TO postgres;

GRANT ALL PRIVILEGES
  ON SEQUENCE coc.player_id_seq
  TO postgres;

