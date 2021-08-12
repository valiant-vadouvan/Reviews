psql postgres

CREATE DATABASE Catwalk-Reviews;

\c Catwalk-Reviews

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  date VARCHAR(20) NOT NULL,
  summary VARCHAR(150) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  reviewer_name VARCHAR(70) NOT NULL,
  reviewer_email VARCHAR(70) NOT NULL,
  response VARCHAR(1000),
  helpfulness SMALLINT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name VARCHAR(7) NOT NULL
);

CREATE TABLE IF NOT EXISTS review_characteristics (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value SMALLINT NOT NULL CHECK (value BETWEEN 1 AND 5),
  CONSTRAINT fk_review
    FOREIGN KEY(id)
      REFERENCES reviews(id),
  CONSTRAINT fk_characteristic
    FOREIGN KEY(id)
      REFERENCES characteristics(id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url VARCHAR(500),
  CONSTRAINT fk_review
    FOREIGN KEY(id)
      REFERENCES reviews(id)
);

COPY reviews FROM '../rawData/reviews.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '../rawData/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY review_characteristics FROM '../rawData/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '../rawData/reviews_photos.csv' DELIMITER ',' CSV HEADER;