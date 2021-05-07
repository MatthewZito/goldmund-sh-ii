package handler

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/MatthewZito/goldmund-sh-ii/api/util"
)

type Message struct {
	Email   string
	Subject string
	Message string
}

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

	fmt.Println(m.Email)
	fmt.Println(m.Subject)
	fmt.Println(m.Message)
	util.FResponse(w, http.StatusOK, m.Message)
}

// _, err := db.InitSQLSession()

// if err != nil {
// 	util.FError(w, http.StatusBadGateway, "An error occurred while connecting to the system's database")
// }
// err = conn.Query(`INSERT INTO "communications" ("subject", "email", "message") VALUES ($1, $2, $3)`, body.subject, body.email, body.message).Run()
