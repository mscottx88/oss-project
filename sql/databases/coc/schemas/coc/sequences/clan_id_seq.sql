CREATE SEQUENCE coc.clan_id_seq;

ALTER SEQUENCE coc.clan_id_seq
  OWNER TO postgres;

GRANT ALL PRIVILEGES
  ON SEQUENCE coc.clan_id_seq
  TO postgres;

