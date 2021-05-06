package handler

import (
	"net/http"
	"time"

	"github.com/MatthewZito/goldmund-sh-ii/api/util"
)

func TestHandler(w http.ResponseWriter, r *http.Request) {
	currentTime := time.Now().Format(time.RFC850)

	util.FResponse(w, http.StatusOK, currentTime)
}
