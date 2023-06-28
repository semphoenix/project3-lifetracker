CREATE TABLE users (
   id         SERIAL PRIMARY KEY,
   first_name TEXT NOT NULL,
   last_name  TEXT NOT NULL,
   email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
   password   TEXT NOT NULL,
   location   TEXT NOT NULL,
   date       TIMESTAMP NOT NULL DEFAULT NOW()
);