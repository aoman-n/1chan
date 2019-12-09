FROM golang:1.12.0-alpine

COPY ./src/api /go/src/github.com/laster18/app/
WORKDIR /go/src/github.com/laster18/app/

RUN apk update \
  && apk add --no-cache git \
  && go get -u github.com/codegangsta/gin \
  && go get -u github.com/golang/dep/cmd/dep \
  && dep ensure

CMD gin -i run
