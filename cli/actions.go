package main

import (
	"fmt"

	"cli/db"
	"cli/internal"
)

func Upload(c *internal.Command) error {
	var t internal.Template

	if err := t.DeconstructWorkspace(); err != nil {
		return err
	}

	db, err := db.Connect()
	if err != nil {
		return err
	}

	defer db.Close()

	exists, err := db.CheckIfExists(c.ID)
	if err != nil {
		return err
	}

	if exists {
		if err := db.UpdatePost(&t); err != nil {
			return err
		}
	} else {
		if err := db.CreatePost(&t); err != nil {
			return err
		}
	}

	receipt := func(exists bool) string {
		if exists {
			return "updated"
		}
		return "created"
	}(exists)

	fmt.Printf("[+] Post with identifier %s has been %s", t.Slug, receipt)
	return nil
}

func Download(c *internal.Command) error {
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

func InitWorkspace(c *internal.Command) error {
	db, err := db.Connect()
	if err != nil {
		return err
	}

	defer db.Close()

	exists, err := db.CheckIfExists(c.ID)
	if err != nil {
		return err
	} else if exists {
		return fmt.Errorf("a post with identifier %s already exists", c.ID)
	}

	if err := internal.Cleanup(); err != nil {
		return err
	}

	p := internal.Post{
		Slug: c.ID,
	}

	return internal.ConstructWorkspace(&p)
}
