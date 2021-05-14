package handler

import (
	"errors"
	"net/http"

	"github.com/MatthewZito/goldmund-sh-ii/api/util"
)

/*
RPC: SubmitCommHandler handles submitted communications forms by allocating message receipts from the UI
into the system database
*/
func Handler(w http.ResponseWriter, r *http.Request) {
	var m Message

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

	util.FResponse(w, http.StatusOK, m.Message, "")
}

type Message struct {
	Email   string
	Subject string
	Message string
}
