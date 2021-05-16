package gql

import (
	"github.com/MatthewZito/goldmund-sh-ii/api/db"
	"github.com/graphql-go/graphql"
)

/* Types */
type RootQuery struct {
	Query *graphql.Object
}

// InitRootQuery returns base query type. This is where we add all the base queries
func InitRootQuery(db *db.Db) *RootQuery {
	// Create a resolver holding our databse. Resolver can be found in resolvers.go
	resolver := Resolver{db: db}

	rootQuery := RootQuery{
		Query: graphql.NewObject(
			graphql.ObjectConfig{
				Name: "Query",
				Fields: graphql.Fields{

					"post": &graphql.Field{
						Type:        PostType,
						Description: "Get post contingent on its slug identifier",
						Args: graphql.FieldConfigArgument{
							"slug": &graphql.ArgumentConfig{
								// fail here and don't pester the database
								Type: graphql.NewNonNull(graphql.String),
							},
						},
						Resolve: resolver.GetPostResolver,
					},

					"posts": &graphql.Field{
						Type:        graphql.NewList(PostMetaDataType),
						Description: "Get metadata for all posts",
						Resolve:     resolver.GetPostsResolver,
					},
				},
			},
		),
	}

	return &rootQuery
}
