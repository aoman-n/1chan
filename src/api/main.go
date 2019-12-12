package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"

	"github.com/laster18/1chan/src/api/config"
	"github.com/laster18/1chan/src/api/routers"
	"github.com/laster18/1chan/src/api/utils"
)

type Product struct {
	gorm.Model
	Code  string
	Price uint
}

func gormConnect() (*gorm.DB, error) {
	DBMS := "mysql"
	USER := config.Db.User
	PASSWORD := config.Db.Password
	PROTOCOL := fmt.Sprintf("tcp(db:%s)", config.Db.Port)
	DBNAME := config.Db.Name
	QUERY := "?charset=utf8&parseTime=True&loc=Local"
	CONNECT := USER + ":" + PASSWORD + "@" + PROTOCOL + "/" + DBNAME + QUERY
	fmt.Println(CONNECT)

	db, err := gorm.Open(DBMS, CONNECT)
	return db, err
}

func main() {
	gin.SetMode("debug")

	// TODO: loggerをmiddlewareで実装する？もしくはライブラリを使う
	utils.LoggingSettings(config.Server.Logfile)

	db, err := gormConnect()
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	db.AutoMigrate(&Product{})

	r := gin.Default()
	routers.InitRouter(r)
	r.Run(":" + config.Server.Port)
}
