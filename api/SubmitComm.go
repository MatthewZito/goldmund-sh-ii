package handler

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/golang/gddo/httputil/header"
)

// FError formats a JSON response (erroneous)
func FError(w http.ResponseWriter, code int, msg string) {
	FResponse(w, code, map[string]string{"error": msg})
}

// FResponse formats a JSON response (successful)
func FResponse(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Clacks-Overhead", "Z29sZG11bmQuc2gK")
	w.Header().Set("X-Powered-By", "goldmund.sh/2.0")
	w.WriteHeader(code)
	w.Write(response)
}

const maxBytesAllowed = 1048576

type malformedRequest struct {
	status int
	msg    string
}

func (m *malformedRequest) Error() string {
	return m.msg
}

func decodeJSONBody(w http.ResponseWriter, r *http.Request, m interface{}) error {
	// if Content-Type header present, validate that it is application/json
	// use of `gddo/httputil/header` will ensure extraction even if the client includes additional charset
	// or boundary information in the header
	if r.Header.Get("Content-Type") != "" {
		value, _ := header.ParseValueAndParams(r.Header, "Content-Type")
		if value != "application/json" {
			msg := "Content-Type header is not application/json"
			return &malformedRequest{status: http.StatusUnsupportedMediaType, msg: msg}
		}
	}

	// now, we enforce a maximum read of 1MB from the response body
	// a larger body will result in `Decode` returning an error in kind
	r.Body = http.MaxBytesReader(w, r.Body, maxBytesAllowed)

	// init decoder and check for invalid fields in json body
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	err := dec.Decode(&m)

	if err != nil {
		var syntaxErr *json.SyntaxError
		var unmarshalTypeErr *json.UnmarshalTypeError

		switch {
		// capture JSON syntax errs and extract loc of said err
		case errors.As(err, &syntaxErr):
			msg := fmt.Sprintf("Request body contains malformed JSON at postition %d", syntaxErr.Offset)
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		// under some circumstances, `Decode` may return a `io.ErrUnexpectedEOF` err for syntax errs in JSON
		// handle these; see https://github.com/golang/go/issues/25956
		case errors.Is(err, io.ErrUnexpectedEOF):
			msg := "Request body contains malformed JSON"
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		// capture type errs e.g. int value being mapped to a str field
		case errors.As(err, &unmarshalTypeErr):
			Field, Offset := unmarshalTypeErr.Field, unmarshalTypeErr.Offset
			msg := fmt.Sprintf("Request body contains an invalid value for the %q field at position %d", Field, Offset)
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		// catch errors resulting from unexpected fields in the request body
		// pending change into sentinel error; see https://github.com/golang/go/issues/29035
		case strings.HasPrefix(err.Error(), "json: unknown field "):
			fieldName := strings.TrimPrefix(err.Error(), "json: unknown field ")
			msg := fmt.Sprintf("Request body contains unknown field %s", fieldName)
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		// if the request body is empty, we receive an `io.EOF` err from `Decode`
		case errors.Is(err, io.EOF):
			msg := "Request body must not be empty"
			return &malformedRequest{status: http.StatusBadRequest, msg: msg}

		// request body exceeds `maxBytesAllowed`
		// pending change into sentinel error; see https://github.com/golang/go/issues/30715
		case err.Error() == "http: request body too large":
			msg := "Request body must not exceed 1MB" // TODO size to const bytes -> readable
			return &malformedRequest{status: http.StatusRequestEntityTooLarge, msg: msg}

		default:
			return err
		}
	}

	// invoke `Decode` again, using a pointer to an empty anon struct as the dest; if rq body only contained
	// a single JSON object, this will return `io.EOF` - thus we will know if we recv excess data in the rq body
	err = dec.Decode(&struct{}{})

	if err != io.EOF {
		msg := "Request body must only contain a single JSON object"
		return &malformedRequest{status: http.StatusBadRequest, msg: msg}
	}

	return nil
}

type Message struct {
	Email   string
	Subject string
	Message string
}

func SubmitCommHandler(w http.ResponseWriter, r *http.Request) {
	var m Message

	err := decodeJSONBody(w, r, &m)

	if err != nil {
		var mr *malformedRequest
		if errors.As(err, &mr) {
			FError(w, mr.status, mr.msg)
		} else {
			FError(w, http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
		}
		return
	}

	fmt.Println(m.Email)
	fmt.Println(m.Subject)
	fmt.Println(m.Message)
	FResponse(w, http.StatusOK, "OK\n")
}

// _, err := db.InitSQLSession()

// if err != nil {
// 	util.FError(w, http.StatusBadGateway, "An error occurred while connecting to the system's database")
// }
// err = conn.Query(`INSERT INTO "communications" ("subject", "email", "message") VALUES ($1, $2, $3)`, body.subject, body.email, body.message).Run()
