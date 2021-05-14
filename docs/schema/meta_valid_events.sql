CREATE TABLE meta_valid_events (
  event VARCHAR(255) PRIMARY KEY
);

INSERT INTO meta_valid_events (event) VALUES 
  ('error'),
  ('interaction');