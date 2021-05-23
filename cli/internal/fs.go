package internal

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"os"

	"github.com/lib/pq"
)

const (
	TRANSIENT_F_JSON    = "metadata.json"
	TRANSIENT_F_CONTENT = "data.md"
	OCTAL_P             = 0644
)

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

// ConstructWorkspace reads data from the Postgres db and initializes an editor workspace
func ConstructWorkspace(p *Post) error {
	m := MetaData{
		p.Uuid,
		p.Title,
		p.Subtitle,
		p.ImgSrc,
		p.Slug,
		p.Tags,
	}

	f, _ := json.MarshalIndent(m, "", " ")

	if err := ioutil.WriteFile(TRANSIENT_F_JSON, f, OCTAL_P); err != nil {
		return err
	}

	if err := ioutil.WriteFile(TRANSIENT_F_CONTENT, []byte(p.Body), OCTAL_P); err != nil {
		return err
	}

	return nil
}

// DeconstructWorkspace reads data from the editor workspace and uploads to the Postgres db
func (t *Template) DeconstructWorkspace() error {
	f, err := ioutil.ReadFile(TRANSIENT_F_JSON)
	if err != nil {
		return err
	}

	if err = json.Unmarshal([]byte(f), &t); err != nil {
		return err
	}

	f, err = ioutil.ReadFile(TRANSIENT_F_CONTENT)
	if err != nil {
		return err
	}

	t.Body = string(f)

	return nil
}

// Extant determines whether a given file path is extant on the host system
func Extant(path string) bool {
	if _, err := os.Stat(path); errors.Is(err, os.ErrNotExist) || err != nil {
		return false
	}

	return true
}

// Cleanup removes workspace files, if extant
func Cleanup() error {
	if Extant(TRANSIENT_F_JSON) {
		if err := os.Remove(TRANSIENT_F_JSON); err != nil {
			return err
		}
	}

	if Extant(TRANSIENT_F_CONTENT) {
		if err := os.Remove(TRANSIENT_F_CONTENT); err != nil {
			return err
		}
	}

	return nil
}
