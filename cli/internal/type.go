package internal

import (
	"github.com/lib/pq"
)

type Command struct {
	Directive string
	ID        string
}

type Post struct {
	Uuid     string         `json:"uuid"`
	Title    string         `json:"title"`
	Subtitle string         `json:"subtitle"`
	ImgSrc   string         `json:"imgSrc"`
	Slug     string         `json:"slug"`
	Tags     pq.StringArray `json:"tags"`
	Body     string         `json:"body"`
}

type Template struct {
	Title    string
	Subtitle string
	ImgSrc   string
	Slug     string
	Tags     []string
	Body     string
}

type MetaData struct {
	Uuid     string         `json:"uuid"`
	Title    string         `json:"title"`
	Subtitle string         `json:"subtitle"`
	ImgSrc   string         `json:"imgSrc"`
	Slug     string         `json:"slug"`
	Tags     pq.StringArray `json:"tags"`
}

type Content struct {
	Body string `json:"body"`
}

type Reader interface {
	DeconstructWorkspace() error
}
