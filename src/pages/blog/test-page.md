---
title: Lorem Ipsum Dolor
subtitle: dolor
createdAt: 2020-01-01
updatedAt: 2021-01-01
imgSrc: https://res.cloudinary.com/goldmund/image/upload/s--LWq6WoCi--/fl_progressive:semi/v1620189111/goldmund-sh/gimageb2_ndrxpe.jpg
slug: test-page
---

# X X X X 

## sub title

```docker
FROM golang:alpine AS builder

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /build

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o app ./cmd/ 

WORKDIR /dist

RUN cp /build/app .
RUN cp /build/.env .

FROM scratch

COPY --from=builder /dist/app . /dist/.env ./

ENTRYPOINT ["/app"]
```
