DROP DATABASE sephora;
CREATE DATABASE sephora;
\c sephora;

CREATE TABLE products (
  id                INT     NOT NULL PRIMARY KEY,
  name              TEXT    NOT NULL,
  description       TEXT    NOT NULL,
  breadcrumbs       TEXT[]  NOT NULL,
  size              TEXT    NOT NULL,
  item_number       TEXT    NOT NULL,
  price             TEXT    NOT NULL,
  details           TEXT    NOT NULL,
  how_to_use        TEXT    NOT NULL,
  ingredients       TEXT    NOT NULL,
  about_the_brand   TEXT    NOT NULL,
  shipping_returns  TEXT    NOT NULL,
  exclusive         BOOLEAN NOT NULL,
  average_rating    REAL    NOT NULL,
  review_count      INT     NOT NULL,
  loves_count       INT     NOT NULL,
  media             TEXT[]  NOT NULL
);

COPY products FROM '/Users/Justin/Git/product-details/data.csv' CSV HEADER;
