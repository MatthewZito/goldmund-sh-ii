CREATE TABLE blog_post_comment (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at DATE NOT NULL,
  comment TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  parent uuid REFERENCES blog_post(uuid)
);