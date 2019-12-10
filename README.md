## 概要

`Golang`と`React`を使った簡単な掲示板アプリ

## Contains

### API

- Golang
- Gin
- GORM
- Mysql
- Toml

### FRONT

- Typescript
- React
- styled-componets
- Semantic-UI

## usage

```
docker-compose up -d --build
```

## directory

```
.
├── README.md
├── docker
│   ├── api
│   │   └── Dockerfile
│   └── front
│       └── Dockerfile
├── docker-compose.yml
└── src
    ├── api
    │   ├── ...
    │   ├── Gopkg.lock
    │   ├── Gopkg.toml
    │   └── main.go
    └── front
        ├── ...
        ├── package.json
        └── src
```

この構成にするとDockerコンテナ内とローカルでGOPATHからのpathの整合性をとるのが面倒？

pathがやたらと長くなる...

こんな感じの指定↓

docker-compose.yml
```yml
api:
  build:
    context: .
    dockerfile: ./docker/api/Dockerfile
  volumes:
    - ./src/api:/go/src/github.com/laster18/1chan/src/api
    - vendor:/go/src/github.com/laster18/1chan/src/api/vendor
```

api/Dockerfile
```
COPY ./src/api /go/src/github.com/laster18/1chan/src/api
WORKDIR /go/src/github.com/laster18/1chan/src/api
```

main.go

```golang
import (
  ...
	"github.com/laster18/1chan/src/api/config"
	"github.com/laster18/1chan/src/api/utils"
)
```