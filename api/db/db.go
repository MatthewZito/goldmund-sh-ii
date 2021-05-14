package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

const (
	dbhost = "DBHOST"
	dbport = "DBPORT"
	dbuser = "DBUSER"
	dbpass = "DBPASS"
	dbname = "DBNAME"
)

func InitDb() (*sql.DB, error) {
	connStr, err := dbConf()
	if err != nil {
		return nil, err
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}

func dbConf() (string, error) {
	conf := make(map[string]string)

	host := os.Getenv(dbhost)
	port := os.Getenv(dbport)
	user := os.Getenv(dbuser)
	pass := os.Getenv(dbpass)
	name := os.Getenv(dbname)

	conf[dbhost] = host
	conf[dbport] = port
	conf[dbuser] = user
	conf[dbpass] = pass
	conf[dbname] = name

	connStr := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		conf[dbhost], conf[dbport],
		conf[dbuser], conf[dbpass], conf[dbname])

	return connStr, nil
}
