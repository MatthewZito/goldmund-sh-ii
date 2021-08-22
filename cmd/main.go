package main

import (
	"cmd/internal"
	"os"
)

/* Commands */
const (
	UPLOAD    = "upload"
	DOWNLOAD  = "download"
	NEW       = "new"
	CLEAN     = "clean"
	ANALYTICS = "analytics"
)

func main() {
	args := os.Args[1:]

	if !internal.Itob(len(args)) {
		internal.ErrExit("A command must be provided")
	} else if !(len(args) == 2) {
		internal.ErrExit("Insufficient arguments were provided")
	}

	c := internal.Command{
		Directive: args[0],
		ID:        args[1],
	}

	switch c.Directive {
	case UPLOAD:
		if err := Upload(&c); err != nil {
			internal.ErrExit(err.Error())
		}
	case DOWNLOAD:
		if err := Download(&c); err != nil {
			internal.ErrExit(err.Error())
		}
	case NEW:
		if err := InitWorkspace(&c); err != nil {
			internal.ErrExit(err.Error())
		}
	// TODO - support path arg
	case CLEAN:
		if err := internal.Cleanup(); err != nil {
			internal.ErrExit(err.Error())
		}
	case ANALYTICS:
		if err := FetchEvents(&c); err != nil {
			internal.ErrExit(err.Error())
		}
	default:
		os.Exit(0)
	}
}
