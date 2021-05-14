CREATE TABLE blog_post_meta (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  img_src VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL,
  slug VARCHAR(255) UNIQUE REFERENCES blog_post(slug)
);