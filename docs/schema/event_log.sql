CREATE TABLE event_log (
  uuid  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- values are stored inline as in the check constraint case; there are no joins, 
  -- but new valid options can be added and existing values updated 
  -- via ON UPDATE CASCADE
  event_type VARCHAR(255) REFERENCES meta_valid_events (event) ON UPDATE CASCADE,
  category VARCHAR(255) NOT NULL,
  info  TEXT NOT NULL,
  logged_at timestamp with time zone DEFAULT now() NOT NULL
);