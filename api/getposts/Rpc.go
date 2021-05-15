package handler

import (
	"net/http"

	"github.com/MatthewZito/goldmund-sh-ii/api/db"
	"github.com/MatthewZito/goldmund-sh-ii/api/util"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	posts := posts{}

	err := queryPosts(&posts)
	if err != nil {
		util.FError(w, http.StatusInternalServerError, err.Error())
		return
	}

	util.FResponse(w, http.StatusOK, "", posts)
}

type postMetaData struct {
	Title   string
	Img_src string
	Slug    string
}

type posts struct {
	Posts []postMetaData
}

func queryPosts(posts *posts) error {
	db, err := db.InitDb()
	if err != nil {
		return err
	}

	defer db.Close()

	rows, err := db.Query(`
		SELECT
			title,
			img_src,
			slug 
		FROM blog_post_meta
		ORDER BY created_at ASC`)

	if err != nil {
		return err
	}

	defer rows.Close()

	for rows.Next() {
		post := postMetaData{}

		err = rows.Scan(
			&post.Title,
			&post.Img_src,
			&post.Slug,
		)
		if err != nil {
			return err
		}

		posts.Posts = append(posts.Posts, post)
	}

	err = rows.Err()
	if err != nil {
		return err
	}

	return nil
}
