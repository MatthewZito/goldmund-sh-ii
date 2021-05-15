package handler

import (
	"errors"
	"net/http"

	"github.com/MatthewZito/goldmund-sh-ii/api/db"
	"github.com/MatthewZito/goldmund-sh-ii/api/util"
)

/*
RPC: LogEvent handles events logging by allocating events from the UI
into the system database
*/
func LogEventHandler(w http.ResponseWriter, r *http.Request) {
	var e Event

	err := util.DecodeJSONBody(w, r, &e)

	if err != nil {
		var mr *util.MalformedRequest
		if errors.As(err, &mr) {
			util.FError(w, mr.Status, mr.Message)
		} else {
			util.FError(w, http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
		}
		return
	}

	err = createLog(&e)
	if err != nil {
		util.FError(w, http.StatusInternalServerError, "Database write failed")
		return
	}

	util.FResponse(w, http.StatusCreated, "OK", "")
}

type Event struct {
	Type     string
	Category string
	Info     string
}

func createLog(e *Event) error {
	db, err := db.InitDb()
	if err != nil {
		return err
	}

	defer db.Close()

	sql := `
	INSERT INTO event_log (event_type, category, info)
	VALUES ($1, $2, $3)`

	// `Exec` uses `ctxDriverPrepare` under the hood and will escape special chars, so we're good here
	_, err = db.Exec(sql, e.Type, e.Category, e.Info)
	if err != nil {
		return err
	}

	return nil
}
