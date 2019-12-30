# base image, using each prod dev
FROM golang:1.13-alpine as base
COPY . /go/src/github.com/laster18/1chan/api
WORKDIR /go/src/github.com/laster18/1chan/api
# 下記エラーのワークアラウンド
# github.com/pressly/goose/vendor/github.com/mattn/go-sqlite3
# exec: "gcc": executable file not found in $PATH
# 参照: https://github.com/mattn/go-sqlite3
ENV CGO_ENABLED=1
RUN apk update \
  && apk add --no-cache git \
  && apk add --update gcc musl-dev \
  && apk add mariadb-client \
  && go get -u github.com/codegangsta/gin \
  && go get -u bitbucket.org/liamstask/goose/cmd/goose \
  && go get -u github.com/golang/dep/cmd/dep \
  # -vendor-only=trueをつけることで、vendorに変更がない場合はキャッシュを使う
  && dep ensure -v -vendor-only=true

# development image
FROM base as development
ENV GO_ENV=development
RUN chmod +x ./start.sh
EXPOSE 3001
ENTRYPOINT ["sh", "./start.sh"]

FROM base as builder
RUN go build -a -tags "netgo" -installsuffix netgo -ldflags="-s -w -extldflags \"-static\"" -o=/app/build main.go

# production image
# TODO: aplineイメージに変える 参考↓
# https://matsuand.github.io/docs.docker.jp.onthefly/develop/develop-images/multistage-build/
# https://blog.potproject.net/2019/05/29/golang-docker-image-bin
FROM golang:1.13-alpine as production

WORKDIR /app
ENV GO_ENV=production

COPY --from=builder /app/build /app/build
COPY --from=builder /go/src/github.com/laster18/1chan/api/start.sh ./
COPY --from=builder /go/src/github.com/laster18/1chan/api/config.toml ./
COPY --from=builder /go/src/github.com/laster18/1chan/api/db/ ./db
COPY --from=builder /go/bin/goose /usr/local/bin/goose
RUN apk update \
  && apk add --no-cache git \
  && apk add mariadb-client
RUN chmod +x ./start.sh && chmod u+x /app/build
EXPOSE 3001
ENTRYPOINT ["sh", "./start.sh"]


