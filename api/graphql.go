package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/MatthewZito/goldmund-sh-ii/api/db"
	"github.com/MatthewZito/goldmund-sh-ii/api/gql"
	"github.com/graphql-go/graphql"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	db, err := db.Connect()
	if err != nil {
		log.Fatal(err)
	}

	sc, err := gql.CreateSchema(db)
	if err != nil {
		log.Fatal(err)
	}

	result := executeQuery(r.URL.Query().Get("query"), sc)

	json.NewEncoder(w).Encode(result)
}

func executeQuery(query string, schema graphql.Schema) *graphql.Result {
	result := graphql.Do(graphql.Params{
		Schema:        schema,
		RequestString: query,
	})

	if len(result.Errors) > 0 {
		fmt.Printf("wrong result, unexpected errors: %v", result.Errors)
	}

	return result
}
