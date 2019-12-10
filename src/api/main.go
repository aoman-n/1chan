package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"

	"github.com/laster18/1chan/src/api/config"
	"github.com/laster18/1chan/src/api/utils"
)

type Product struct {
	gorm.Model
	Code  string
	Price uint
}

func main() {
	// TODO: loggerをmiddlewareで実装する？もしくはライブラリを使う
	utils.LoggingSettings(config.Server.Logfile)

	dbUrl := fmt.Sprintf(
		"%s:%s@tcp(db:%s)/%s",
		config.Db.User,
		config.Db.Password,
		config.Db.Port,
		config.Db.Name)
	db, err := gorm.Open("mysql", dbUrl+"?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	db.AutoMigrate(&Product{})

	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "ping",
		})
	})
	r.Run(":" + config.Server.Port)
}
