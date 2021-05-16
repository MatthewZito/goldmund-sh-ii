package handler

import (
	"fmt"
	"log"
	"net/http"

	"github.com/MatthewZito/goldmund-sh-ii/api/db"
	"github.com/MatthewZito/goldmund-sh-ii/api/gql"
	"github.com/MatthewZito/goldmund-sh-ii/api/util"
	"github.com/graphql-go/graphql"
)

// TODO reloc db conn to context
func Handler(w http.ResponseWriter, r *http.Request) {
	db, err := db.Connect()
	if err != nil {
		// TODO FError
		log.Fatal(err)
	}

	sc, err := gql.CreateSchema(db)
	if err != nil {
		// TODO FError
		log.Fatal(err)
	}

	result := executeQuery(r.URL.Query().Get("query"), sc)

	util.FResponse(w, result)
}

func executeQuery(query string, schema graphql.Schema) *graphql.Result {
	result := graphql.Do(graphql.Params{
		Schema:        schema,
		RequestString: query,
	})

	if len(result.Errors) > 0 {
		// TODO FError
		fmt.Printf("wrong result, unexpected errors: %v", result.Errors)
	}

	return result
}