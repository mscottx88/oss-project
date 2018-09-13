DROP TABLE IF EXISTS coc.player;

CREATE TABLE coc.player (
  player_id BIGINT NOT NULL PRIMARY KEY DEFAULT NEXTVAL('coc.player_id_seq'),
  player_tag TEXT NOT NULL UNIQUE
);
