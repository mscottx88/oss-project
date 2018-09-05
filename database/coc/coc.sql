CREATE DATABASE coc
  WITH
  OWNER = cloudsqlsuperuser
  ENCODING = 'UTF8'
  LC_COLLATE = 'en_US.UTF8'
  LC_CTYPE = 'en_US.UTF8'
  TABLESPACE = pg_default
  CONNECTION LIMIT = -1;

GRANT ALL
  ON DATABASE coc
  TO cloudsqlsuperuser;

GRANT ALL
  ON DATABASE coc
  TO postgres;
