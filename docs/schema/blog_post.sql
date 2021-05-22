CREATE TABLE blog_post (
  uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone,
  img_src VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  tags VARCHAR(255)[],
  body TEXT
);
