FROM golang:1.13-alpine

COPY ./src/api /go/src/github.com/laster18/1chan/src/api
WORKDIR /go/src/github.com/laster18/1chan/src/api

# 下記エラーのワークアラウンド
# github.com/pressly/goose/vendor/github.com/mattn/go-sqlite3
# exec: "gcc": executable file not found in $PATH
# 参照: https://github.com/mattn/go-sqlite3
ENV CGO_ENABLED=1

RUN apk update \
  && apk add --no-cache git \
  && apk add --update gcc musl-dev \
  && go get -u github.com/codegangsta/gin \
  && go get -u bitbucket.org/liamstask/goose/cmd/goose \
  && go get -u github.com/golang/dep/cmd/dep \
  && dep ensure

CMD gin -i run
