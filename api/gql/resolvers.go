package gql

import (
	"github.com/MatthewZito/goldmund-sh-ii/api/db"
	"github.com/graphql-go/graphql"
)

/* Types */
type Resolver struct {
	db *db.Db
}

/* Resolvers */

// PostResolver resolves slug-contingent queries for a post
func (r *Resolver) GetPostResolver(p graphql.ResolveParams) (interface{}, error) {
	slug, _ := p.Args["slug"].(string)

	post, err := r.db.GetPost(slug)
	if err != nil {
		return nil, err
	}

	return post, nil
}

// PostsResolver resolves queries for all posts metadata
func (r *Resolver) GetPostsResolver(p graphql.ResolveParams) (interface{}, error) {
	posts, err := r.db.GetPosts()
	if err != nil {
		return nil, err
	}

	return posts, nil
}

// CreateMessageResolver resolves mutations directing the creation of a contact message
func (r *Resolver) CreateMessageResolver(p graphql.ResolveParams) (interface{}, error) {
	email, _ := p.Args["email"].(string)
	subject, _ := p.Args["subject"].(string)
	body, _ := p.Args["body"].(string)

	m := db.Message{
		Email:   email,
		Subject: subject,
		Body:    body,
	}

	if err := r.db.CreateMessage(&m); err != nil {
		return db.Event{}, err
	}

	return m, nil
}

// CreateEventResolver resolves mutations directing the creation of an event log
func (r *Resolver) CreateEventResolver(p graphql.ResolveParams) (interface{}, error) {
	t, _ := p.Args["type"].(string)
	cat, _ := p.Args["category"].(string)
	info, _ := p.Args["info"].(string)

	e := db.Event{
		Type:     t,
		Category: cat,
		Info:     info,
	}

	if err := r.db.CreateEvent(&e); err != nil {
		return db.Event{}, err
	}

	return e, nil
}
