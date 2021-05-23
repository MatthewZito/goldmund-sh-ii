package db

import (
	"database/sql"
	"os"
	"time"

	"cli/internal"

	"github.com/lib/pq"
)

/* Constants */
const dbConn = "DB_CONN"

/* TypeDefs */
type Db struct {
	*sql.DB
}

type Existential struct {
	Exists bool
}

// Connect initializes a database connection, pings said connection to ensure liveness,
// and returns either a pointer to the connection or an error
func Connect() (*Db, error) {
	connStr := os.Getenv(dbConn)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	return &Db{db}, nil
}

func (db *Db) CheckIfExists(s string) (bool, error) {
	sql := `
		SELECT COUNT(1)
		FROM blog_post
		WHERE uuid = $1;
	`

	row := db.QueryRow(sql, s)

	e := Existential{}

	if err := row.Scan(&e.Exists); err != nil {
		return false, err
	}

	return e.Exists, nil
}

// GetPost attempts to a select - by slug - a post from the Postgres database
// and returns either the retrieved data or an error
func (db *Db) GetPost(s string) (internal.Post, error) {
	sql := `
		SELECT
			uuid,
			title,
			subtitle,
			img_src,
			slug,
			tags,
			body
		FROM blog_post
		WHERE slug=$1
		LIMIT 1;`

	row := db.QueryRow(sql, s)

	var p internal.Post

	if err := row.Scan(
		&p.Uuid,
		&p.Title,
		&p.Subtitle,
		&p.ImgSrc,
		&p.Slug,
		&p.Tags,
		&p.Body,
	); err != nil {
		return internal.Post{}, err
	}

	return p, nil
}

// CreatePost attempts to a create a new post in the Postgres database
func (db *Db) CreatePost(t *internal.Template) error {
	sql := `
		INSERT INTO blog_post
			(
				title,
				subtitle,
				img_src,
				slug,
				tags,
				body
			)
			VALUES ($1 $2 $3 $4 $5 $6);
			`

	if _, err := db.Exec(sql,
		t.Title,
		t.Subtitle,
		t.ImgSrc,
		t.Slug,
		pq.StringArray(t.Tags),
		t.Body,
	); err != nil {
		return err
	}

	return nil

}

// UpdatePost attempts to a update - by uuid - a post in the Postgres database
func (db *Db) UpdatePost(t *internal.Template) error {
	sql := `
		UPDATE blog_post
		SET
			title = $1,
			subtitle = $2,
			img_src = $3,
			slug = $4,
			tags = $5,
			body = $6,
			updated_at = $7
		WHERE slug = $4
	`

	if _, err := db.Exec(sql,
		t.Title,
		t.Subtitle,
		t.ImgSrc,
		t.Slug,
		pq.StringArray(t.Tags),
		t.Body,
		time.Now().UTC(),
	); err != nil {
		return err
	}

	return nil
}
