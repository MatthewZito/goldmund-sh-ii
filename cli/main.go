package main

import (
	"fmt"
	"os"

	"cli/internal"

	"cli/db"
)

/* Constants */
const (
	UPLOAD   = "upload"
	DOWNLOAD = "download"
)

/* MAIN */
func main() {
	args := os.Args[1:]

	if !internal.Itob(len(args)) {
		internal.ErrExit("A command must be provided")
	} else if !(len(args) == 2) {
		internal.ErrExit("Insufficient arguments were provided")
	}

	c := internal.Command{
		args[0],
		args[1],
	}

	switch c.Directive {
	case UPLOAD:
		receipt, err := upload(&c)
		if err != nil {
			internal.ErrExit(err.Error())
		}
		fmt.Println(receipt)
	case DOWNLOAD:
		if err := download(&c); err != nil {
			internal.ErrExit(err.Error())
		}
	default:
		os.Exit(0)
	}
}

/* Actions */
func upload(c *internal.Command) (string, error) {
	var t internal.Template

	if err := t.DeconstructWorkspace(); err != nil {
		return "", err
	}

	db, err := db.Connect()
	if err != nil {
		return "", err
	}

	defer db.Close()

	exists, err := db.CheckIfExists(c.ID)
	if err != nil {
		return "", err
	}

	if exists {
		if err := db.UpdatePost(&t); err != nil {
			return "", err
		}
	} else {
		if err := db.CreatePost(&t); err != nil {
			return "", err
		}
	}

	return fmt.Sprintf("[+] Post with identifier %s has been %s", t.Slug, fReceipt(exists)), nil
}

func download(c *internal.Command) error {
	if err := internal.Cleanup(); err != nil {
		return err
	}

	db, err := db.Connect()
	if err != nil {
		return err
	}

	defer db.Close()

	p, err := db.GetPost(c.ID)
	if err != nil {
		return err
	}

	if err = internal.ConstructWorkspace(&p); err != nil {
		return err
	}

	return nil
}

func fReceipt(exists bool) string {
	if exists {
		return "updated"
	}
	return "created"
}
