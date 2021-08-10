psql postgres

CREATE DATABASE Catwalk-Reviews;

\c Catwalk-Reviews

CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating SMALLINT NOT NULL,
  CHECK (rating BETWEEN 1 AND 5), -- correct syntax?
  summary VARCHAR(150) NOT NULL,
  recommended BOOLEAN NOT NULL,
  response VARCHAR(1000),
  body VARCHAR(1000) NOT NULL,
  date TIMESTAMP NOT NULL,
  reviewer_name VARCHAR(70) NOT NULL,
  helpfulness SMALLINT, --default 0?
  reported BOOLEAN, --default false?
);

CREATE TABLE IF NOT EXISTS characteristics (
  characteristic_id SERIAL PRIMARY KEY,
  characteristic_name VARCHAR(7) NOT NULL
);

CREATE TABLE IF NOT EXISTS review_characteristics (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  characteristic_id INTEGER NOT NULL,
  rating SMALLINT NOT NULL,
  CHECK (rating BETWEEN 1 AND 5), -- correct syntax?
  CONSTRAINT fk_review
    FOREIGN KEY(review_id)
      REFERENCES reviews(review_id),
  CONSTRAINT fk_characteristic
    FOREIGN KEY(characteristic_id)
      REFERENCES characteristics(characteristic_id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  photo_url VARCHAR(300), --too big?
  CONSTRAINT fk_review
    FOREIGN KEY(review_id)
      REFERENCES reviews(review_id)
);