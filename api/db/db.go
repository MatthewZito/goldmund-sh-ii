package db

import (
	"database/sql"
	"os"
	"time"

	"github.com/lib/pq"
)

/* Constants */
const dbConn = "DB_CONN"

/* TypeDefs */
type Db struct {
	*sql.DB
}

type PostMetaData struct {
	Title   string `json:"title"`
	Img_src string `json:"imgSrc"`
	Slug    string `json:"slug"`
}

type Post struct {
	Uuid       string         `json:"uuid"`
	Title      string         `json:"title"`
	Subtitle   string         `json:"subtitle"`
	Created_at time.Time      `json:"createdAt"`
	Updated_at time.Time      `json:"updatedAt"`
	Img_src    string         `json:"imgSrc"`
	Slug       string         `json:"slug"`
	Tags       pq.StringArray `json:"tags"`
	Body       string         `json:"body"`
}

type Message struct {
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Body    string `json:"body"`
}

type Event struct {
	Type     string `json:"type"`
	Category string `json:"category"`
	Info     string `json:"info"`
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

// GetPosts attempts to select all post metadata from the Postgres database
// and returns either the retrieved data or an error
func (db *Db) GetPosts() ([]PostMetaData, error) {
	rows, err := db.Query(`
		SELECT
			title,
			img_src,
			slug 
		FROM blog_post
		ORDER BY created_at ASC`)

	if err != nil {
		return []PostMetaData{}, err
	}

	defer rows.Close()

	var p []PostMetaData

	for rows.Next() {
		post := PostMetaData{}

		if err = rows.Scan(
			&post.Title,
			&post.Img_src,
			&post.Slug,
		); err != nil {
			return []PostMetaData{}, err
		}

		p = append(p, post)
	}

	if err = rows.Err(); err != nil {
		return []PostMetaData{}, err
	}

	return p, nil
}

// GetPost attempts to a select - by slug - a post from the Postgres database
// and returns either the retrieved data or an error
func (db *Db) GetPost(s string) (Post, error) {
	sql := `
		SELECT
			uuid,
			title,
			subtitle,
			created_at,
			COALESCE(updated_at, created_at),
			img_src,
			slug,
			tags,
			body
		FROM blog_post
		WHERE slug=$1
		LIMIT 1;`

	row := db.QueryRow(sql, s)

	var p Post

	if err := row.Scan(
		&p.Uuid,
		&p.Title,
		&p.Subtitle,
		&p.Created_at,
		&p.Updated_at,
		&p.Img_src,
		&p.Slug,
		&p.Tags,
		&p.Body,
	); err != nil {
		return Post{}, err
	}

	return p, nil
}

// CreateEvent attempts to create an event log in the Postgres database
func (db *Db) CreateEvent(e *Event) error {
	sql := `
	INSERT INTO event_log (event_type, category, info)
	VALUES ($1, $2, $3)`

	// `Exec` uses `ctxDriverPrepare` under the hood and will escape special chars, so we're good here
	if _, err := db.Exec(sql, e.Type, e.Category, e.Info); err != nil {
		return err
	}

	return nil
}

// CreateMessage attempts to create as a record a user-submitted messag in the Postgres database
func (db *Db) CreateMessage(e *Message) error {
	sql := `
	INSERT INTO contact_form (email, subject, body)
	VALUES ($1, $2, $3)`

	if _, err := db.Exec(sql, e.Email, e.Subject, e.Body); err != nil {
		return err
	}

	return nil
}
