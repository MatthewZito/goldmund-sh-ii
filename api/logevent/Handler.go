package handler

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/MatthewZito/goldmund-sh-ii/api/serverless/util"
)

/*
RPC: LogEventHandler handles events logging by allocating events from the UI
into the system database
*/
func Handler(w http.ResponseWriter, r *http.Request) {
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
	util.FResponse(w, http.StatusOK, string(payload), "")
}

type LogEvent struct {
	Type     string
	Category string
	Info     string
}
