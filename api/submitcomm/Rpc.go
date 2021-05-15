package handler

import (
	"errors"
	"net/http"

	"github.com/MatthewZito/goldmund-sh-ii/api/db"
	"github.com/MatthewZito/goldmund-sh-ii/api/util"
)

/*
RPC: SubmitCommHandler handles submitted communications forms by allocating message receipts from the UI
into the system database
*/
func SubmitCommHandler(w http.ResponseWriter, r *http.Request) {
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

	err = createComm(&m)
	if err != nil {
		util.FError(w, http.StatusInternalServerError, "Database write failed")
		return
	}

	util.FResponse(w, http.StatusCreated, "OK", "")
}

type Message struct {
	Email   string
	Subject string
	Comment string
}

func createComm(m *Message) error {
	db, err := db.InitDb()
	if err != nil {
		return err
	}

	defer db.Close()

	sql := `
	INSERT INTO contact_form (email, subject, comment)
	VALUES ($1, $2, $3)`

	// `Exec` uses `ctxDriverPrepare` under the hood and will escape special chars, so we're good here
	_, err = db.Exec(sql, m.Email, m.Subject, m.Comment)
	if err != nil {
		return err
	}

	return nil
}
