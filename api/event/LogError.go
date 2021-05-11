package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/MatthewZito/goldmund-sh-ii/api/util"
)

type LogEvent struct {
	Time  time.Time
	Error string
	Info  string
	Type  string
}

/*
RPC: LogErrorHandler handles error events logging by allocating error events from the UI
into the system database
*/
func LogErrorHandler(w http.ResponseWriter, r *http.Request) {
	var m LogEvent

	err := util.DecodeJSONBody(w, r, &m)

	if err != nil {
		var mr *util.MalformedRequest
		if errors.As(err, &mr) {
			util.FError(w, mr.Status, mr.Message)
		} else {
			util.FError(w, http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
		}
		return
	}

	payload, _ := json.Marshal(m)
	util.FResponse(w, http.StatusOK, string(payload))
}
