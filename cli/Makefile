GOCMD=go
GORUN=$(GOCMD) run
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get

BIN_NAME=goldmund
BIN_UNIX=$(BIN_NAME)_unix

all: clean build

build:
	$(GOBUILD) -o $(BIN_NAME) -v

.PHONY: test

test: 
	$(GOTEST) -v ./...

clean: 
	$(GOCLEAN)
	rm -f $(BIN_NAME)
	rm -f $(BIN_UNIX)

run/dev:
	$(GORUN) . ${ARGS}
