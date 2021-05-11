package util

import (
	"encoding/json"
	"net/http"
)

type ResponseModel struct {
	Message string
	Error   string
}

/*
FError sends a model-formatted JSON response object for 400-status responses
*/
func FError(w http.ResponseWriter, code int, msg string) {
	payload := &ResponseModel{
		Message: "",
		Error:   msg,
	}

	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Clacks-Overhead", "Z29sZG11bmQuc2gK")
	w.Header().Set("X-Powered-By", "goldmund.sh/2.0")
	w.WriteHeader(code)
	w.Write(response)
}

/*
FResponse sends a model-formatted JSON response object for 200-status responses
*/
func FResponse(w http.ResponseWriter, code int, msg string) {
	payload := &ResponseModel{
		Message: msg,
		Error:   "",
	}

	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Clacks-Overhead", "Z29sZG11bmQuc2gK")
	w.Header().Set("X-Powered-By", "goldmund.sh/2.0")
	w.WriteHeader(code)
	w.Write(response)
}
