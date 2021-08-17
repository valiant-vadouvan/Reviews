CREATE DATABASE catwalkreviews;

\c catwalkreviews

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  date VARCHAR(20) NOT NULL,
  summary VARCHAR(1000) NOT NULL,
  body VARCHAR(2000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  reviewer_name VARCHAR(70) NOT NULL,
  reviewer_email VARCHAR(70) NOT NULL,
  response VARCHAR(2000),
  helpfulness SMALLINT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL REFERENCES reviews(id),
  url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS review_characteristics (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER NOT NULL REFERENCES characteristics(id),
  review_id INTEGER NOT NULL REFERENCES reviews(id),
  value SMALLINT NOT NULL CHECK (value BETWEEN 1 AND 5)
);

-- load db
\copy reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/briangoodall/Documents/work/Hack Reactor/Immersive/SDC/Reviews/rawData/reviews.csv' DELIMITER ',' CSV HEADER;
\copy photos(id, review_id, url) FROM '/Users/briangoodall/Documents/work/Hack Reactor/Immersive/SDC/Reviews/rawData/reviews_photos.csv' DELIMITER ',' CSV HEADER;
\copy characteristics(id, product_id, name) FROM '/Users/briangoodall/Documents/work/Hack Reactor/Immersive/SDC/Reviews/rawData/characteristics.csv' DELIMITER ',' CSV HEADER;
\copy review_characteristics(id, characteristic_id, review_id, value) FROM '/Users/briangoodall/Documents/work/Hack Reactor/Immersive/SDC/Reviews/rawData/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;


-- updates current id of each table so inserts work properly
SELECT pg_catalog.setval(pg_get_serial_sequence('reviews', 'id'), (SELECT MAX(id) FROM reviews)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('photos', 'id'), (SELECT MAX(id) FROM photos)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('review_characteristics', 'id'), (SELECT MAX(id) FROM review_characteristics)+1);
SELECT pg_catalog.setval(pg_get_serial_sequence('characteristics', 'id'), (SELECT MAX(id) FROM characteristics)+1);


-- update null string to null
UPDATE reviews SET response = NULL where response =  'null';


-- indexes for faster queries
CREATE INDEX productID_index ON reviews (product_id);
CREATE INDEX reviewID_photo_index ON photos (review_id);
CREATE INDEX characteristicID_review_index ON review_characteristics (characteristic_id);
CREATE INDEX reviewID_characteristics_index ON review_characteristics (review_id);
CREATE INDEX product_id_index ON characteristics (product_id);