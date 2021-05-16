package util

import (
	"encoding/json"
	"net/http"

	"github.com/graphql-go/graphql"
)

type ErroneousResponse struct {
	Errors []string
}

func FError(w http.ResponseWriter, e error) {
	writeHeaders(w, true)
	json.NewEncoder(w).Encode(e)
}

func FResponse(w http.ResponseWriter, data *graphql.Result) {
	writeHeaders(w, true)
	json.NewEncoder(w).Encode(data)
}

func writeHeaders(w http.ResponseWriter, json bool) {
	if json {
		w.Header().Set("Content-Type", "application/json")
	}

	w.Header().Set("X-Clacks-Overhead", "Ezra Pound")
	w.Header().Set("X-Powered-By", "goldmund.sh/2.0")
	w.Header().Set("X-Programmed-By", "goldmund")
}
