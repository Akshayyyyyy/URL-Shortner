CREATE TABLE short_urls (
  id SERIAL PRIMARY KEY,
  full_url TEXT NOT NULL,
  short_url VARCHAR(10) UNIQUE NOT NULL
);
