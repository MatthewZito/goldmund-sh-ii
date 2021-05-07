package util

import (
	"encoding/json"
	"net/http"
)

type ResponseModel struct {
	Message string
	Error   string
}

// FError formats a JSON response (erroneous)
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

// FResponse formats a JSON response (successful)
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
