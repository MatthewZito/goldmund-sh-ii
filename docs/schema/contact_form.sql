CREATE TABLE contact_form (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  comment TEXT NOT NULL,
  logged_at timestamp with time zone DEFAULT now() NOT NULL
);