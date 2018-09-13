DROP TABLE IF EXISTS coc.daily_info_snapshot CASCADE;

CREATE TABLE coc.daily_info_snapshot (
  daily_info_snapshot_id BIGINT NOT NULL PRIMARY KEY DEFAULT NEXTVAL('coc.daily_info_snapshot_id_seq'),
  clan_id BIGINT
    REFERENCES coc.clan
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  player_id BIGINT
    REFERENCES coc.clan
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  snapshot_date DATE NOT NULL,
  snapshot_type TEXT,
  coc_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
