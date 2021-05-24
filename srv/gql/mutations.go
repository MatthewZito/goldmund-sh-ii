package gql

import (
	"github.com/MatthewZito/goldmund-sh-ii/srv/db"
	"github.com/graphql-go/graphql"
)

/* TypeDefs */
type RootMutation struct {
	Mutation *graphql.Object
}

/* Mutations */

// InitRootMutation is the root mutation object
func InitRootMutation(db *db.Db) *RootMutation {
	resolver := Resolver{db: db}

	rootMutation := RootMutation{
		Mutation: graphql.NewObject(
			graphql.ObjectConfig{
				Name: "RootMutation",
				Fields: graphql.Fields{

					"createMessage": &graphql.Field{
						Type:        MessageType,
						Description: "Submit a new communications form",
						Args: graphql.FieldConfigArgument{
							"email": &graphql.ArgumentConfig{
								Type: graphql.String,
							},
							"subject": &graphql.ArgumentConfig{
								Type: graphql.String,
							},
							"body": &graphql.ArgumentConfig{
								Type: graphql.String,
							},
						},
						Resolve: resolver.CreateMessageResolver,
					},

					"createEvent": &graphql.Field{
						Type:        EventLogType,
						Description: "Submit a new event log",
						Args: graphql.FieldConfigArgument{
							"type": &graphql.ArgumentConfig{
								// null failure will propagate for the entire object, so we only need one to enforce
								Type: graphql.NewNonNull(graphql.String),
							},
							"category": &graphql.ArgumentConfig{
								Type: graphql.String,
							},
							"info": &graphql.ArgumentConfig{
								Type: graphql.String,
							},
						},
						Resolve: resolver.CreateEventResolver,
					},
				},
			},
		),
	}
	return &rootMutation
}
