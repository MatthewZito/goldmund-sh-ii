package util

import (
	"encoding/json"
	"net/http"

	"github.com/graphql-go/graphql"
)

type ErrorObject struct {
	Message   string   `json:"message"`
	Locations []string `json:"locations"`
}

type ErroneousResponse struct {
	Data   *string       `json:"data"`
	Errors []ErrorObject `json:"errors"`
}

func FError(w http.ResponseWriter, e error) {
	er := &ErroneousResponse{
		Data: nil, // will be marshalled as `null`
		Errors: []ErrorObject{{
			Message:   e.Error(),
			Locations: []string{},
		}},
	}

	writeHeaders(w, true)
	// w.WriteHeader(400)
	json.NewEncoder(w).Encode(er)

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
