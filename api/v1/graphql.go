package handler

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/MatthewZito/goldmund-sh-ii/api/db"
	"github.com/MatthewZito/goldmund-sh-ii/api/gql"
	"github.com/MatthewZito/goldmund-sh-ii/api/util"
	"github.com/graphql-go/graphql"
)

// TODO reloc db conn to context
func Handler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
	if err != nil {
		util.FError(w, err)
		return
	}

	var apolloQuery map[string]interface{}

	if err := json.Unmarshal(body, &apolloQuery); err != nil {
		util.FError(w, err)
		return
	}

	query := apolloQuery["query"]
	variables := apolloQuery["variables"]

	db, err := db.Connect()
	if err != nil {
		util.FError(w, err)
		return
	}

	defer db.Close()

	sc, err := gql.CreateSchema(db)
	if err != nil {
		util.FError(w, err)
		return
	}

	result := executeQuery(query.(string), variables, sc)

	util.FResponse(w, result)
}

func executeQuery(query string, variables interface{}, schema graphql.Schema) *graphql.Result {
	result := graphql.Do(graphql.Params{
		Schema:         schema,
		RequestString:  query,
		VariableValues: variables.(map[string]interface{}),
	})

	// TODO mode == dev
	if len(result.Errors) > 0 {
		fmt.Printf("Errors: %v", result.Errors)
	}

	return result
}
