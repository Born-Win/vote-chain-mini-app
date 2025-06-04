CREATE TABLE users (
  public_key      BYTEA       PRIMARY KEY,               
  public_key_fp   CHAR(64)    NOT NULL UNIQUE,           -- hex(SHA-256)
  created_at      TIMESTAMP   NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_public_key_fp ON users(public_key_fp);


CREATE TABLE vote_sessions (
  id           UUID        PRIMARY KEY,
  title        TEXT        NOT NULL,
  description  TEXT        NULL,
  created_by   CHAR(64)    NOT NULL
    REFERENCES users(public_key_fp) ON DELETE CASCADE,
  created_at   TIMESTAMP   NOT NULL DEFAULT now(),
  starts_at    TIMESTAMP   NOT NULL,
  ends_at      TIMESTAMP   NOT NULL,
  status       VARCHAR(8)  NOT NULL
    CHECK (status IN ('active','finished'))
);

CREATE TABLE vote_options (
  id            UUID     PRIMARY KEY,
  session_id    UUID       NOT NULL
    REFERENCES vote_sessions(id) ON DELETE CASCADE,
  option_index  INT        NOT NULL,
  label         TEXT       NOT NULL,
  vote_count    BIGINT     NOT NULL DEFAULT 0,
  UNIQUE (session_id, option_index)
);

CREATE TABLE vote_records (
  id             UUID       PRIMARY KEY,
  session_id     UUID       NOT NULL
    REFERENCES vote_sessions(id) ON DELETE CASCADE,
  voter_fp       CHAR(64)   NOT NULL
    REFERENCES users(public_key_fp) ON DELETE CASCADE,
  option_id      UUID        NOT NULL
    REFERENCES vote_options(id) ON DELETE RESTRICT,
  signature      TEXT       NOT NULL,
  voted_at       TIMESTAMP  NOT NULL DEFAULT now(),
  tx_hash        TEXT       NULL,
  UNIQUE (session_id, voter_fp)
);

CREATE UNIQUE INDEX idx_vote_sessions_by_creator_fp ON vote_sessions(created_by);

CREATE INDEX idx_vote_records_session ON vote_records(session_id);

CREATE INDEX idx_vote_records_voter   ON vote_records(voter_fp);
