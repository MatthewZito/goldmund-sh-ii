package db

import (
	"os"

	"github.com/eaigner/jet"
	"github.com/joho/godotenv"
	"github.com/lib/pq"
)

func InitSQLSession() (*jet.Db, error) {
	err := godotenv.Load()

	if err != nil {
		return nil, err
	}

	endpoint := os.Getenv("POSTGRES_URI")

	connUri, err := pq.ParseURL(endpoint)

	if err != nil {
		return nil, err
	}

	db, err := jet.Open("postgres", connUri)

	if err != nil {
		return nil, err
	}

	return db, nil
}
