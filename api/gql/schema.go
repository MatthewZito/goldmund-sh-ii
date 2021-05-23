package gql

import (
	"github.com/MatthewZito/goldmund-sh-ii/api/db"
	"github.com/graphql-go/graphql"
)

func CreateSchema(db *db.Db) (graphql.Schema, error) {
	schema, err := graphql.NewSchema(
		graphql.SchemaConfig{
			Query:    InitRootQuery(db).Query,
			Mutation: InitRootMutation(db).Mutation,
		},
	)
	if err != nil {
		return graphql.Schema{}, err
	}

	return schema, nil
}
