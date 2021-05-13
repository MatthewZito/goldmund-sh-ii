package handler

import (
	"errors"
	"net/http"
	"time"

	"github.com/MatthewZito/goldmund-sh-ii/api/serverless/db"
	"github.com/MatthewZito/goldmund-sh-ii/api/serverless/util"
	"github.com/lib/pq"
)

/* Handler */
func Handler(w http.ResponseWriter, r *http.Request) {
	var q query
	post := postData{}

	err := util.DecodeJSONBody(w, r, &q)

	if err != nil {
		var mr *util.MalformedRequest
		if errors.As(err, &mr) {
			util.FError(w, mr.Status, mr.Message)
		} else {
			util.FError(w, http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
		}
		return
	}

	err = queryPost(&post, q.Slug)
	if err != nil {
		util.FError(w, http.StatusInternalServerError, err.Error())
		return
	}

	util.FResponse(w, http.StatusOK, "", post)
}

/* TypeDefs */
type postData struct {
	Uuid       string
	Title      string
	Subtitle   string
	Created_at time.Time
	Updated_at time.Time
	Img_src    string
	Slug       string
	Tags       pq.StringArray
	Body       string
}

type post struct {
	Post postData
}

type query struct {
	Slug string
}

/* Integration */
func queryPost(post *postData, slug string) error {
	db, err := db.InitDb()
	if err != nil {
		return err
	}

	defer db.Close()

	sql := `
        SELECT
						Uuid,
						Title,
						Subtitle,
						Created_at,
						COALESCE(Updated_at, Created_at),
						Img_src,
						Slug,
						Tags,
						Body
        FROM blog_post
        WHERE slug=$1
        LIMIT 1;`

	row := db.QueryRow(sql, slug)

	err = row.Scan(
		&post.Uuid,
		&post.Title,
		&post.Subtitle,
		&post.Created_at,
		&post.Updated_at,
		&post.Img_src,
		&post.Slug,
		&post.Tags,
		&post.Body,
	)

	if err != nil {
		return err
	}

	return nil
}
