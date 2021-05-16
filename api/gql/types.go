package gql

import (
	"github.com/graphql-go/graphql"
)

/* Meta Types */
var PostMetaDataType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "postMetaData",
		Fields: graphql.Fields{
			"title": &graphql.Field{
				Type: graphql.String,
			},
			"imgSrc": &graphql.Field{
				Type: graphql.String,
			},
			"slug": &graphql.Field{
				Type: graphql.String,
			},
		},
	},
)

var eventsEnum = graphql.NewEnum(graphql.EnumConfig{
	Name:        "event",
	Description: "Valid event types",
	Values: graphql.EnumValueConfigMap{
		"ERROR": &graphql.EnumValueConfig{
			Value:       "error",
			Description: "An error event ",
		},
		"INTERACTION": &graphql.EnumValueConfig{
			Value:       "interaction",
			Description: "An interaction event",
		},
	},
})

/* Types */

// PostType represents a single post
var PostType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "post",
		Fields: graphql.Fields{
			"uuid": &graphql.Field{
				Type: graphql.String,
			},
			"title": &graphql.Field{
				Type: graphql.String,
			},
			"subtitle": &graphql.Field{
				Type: graphql.String,
			},
			"createdAt": &graphql.Field{
				Type: graphql.DateTime,
			},
			"updatedAt": &graphql.Field{
				Type: graphql.DateTime,
			},
			"imgSrc": &graphql.Field{
				Type: graphql.String,
			},
			"slug": &graphql.Field{
				Type: graphql.String,
			},
			"tags": &graphql.Field{
				Type: graphql.NewList(graphql.String),
			},
			"body": &graphql.Field{
				Type: graphql.String,
			},
		},
	})

// CommType represents a submitted contact form
var CommType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "comm",
		Fields: graphql.Fields{
			"email": &graphql.Field{
				Type: graphql.String,
			},
			"subject": &graphql.Field{
				Type: graphql.String,
			},
			"comment": &graphql.Field{
				Type: graphql.String,
			},
		},
	},
)

// EventLog represents a submitted event log
var EventLogType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "comm",
		Fields: graphql.Fields{
			"type": &graphql.Field{
				Type: eventsEnum,
			},
			"category": &graphql.Field{
				Type: graphql.String,
			},
			"info": &graphql.Field{
				Type: graphql.String,
			},
		},
	},
)
