package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"time"

	"github.com/laster18/1chan/api/config"
	"github.com/laster18/1chan/api/db"
	"github.com/laster18/1chan/api/routers"
	"github.com/laster18/1chan/api/utils"
)

// 確認用、あとで消す
type User struct {
	gorm.Model
	name     string
	birthday time.Time
}

func main() {
	// setup logger
	utils.InitLogging()

	// setup DB
	db.Setup()
	defer db.Close()
	// 確認用、あとで消す
	db.Db.AutoMigrate(&User{})

	// setup gin
	gin.SetMode("debug")
	router := gin.Default()
	// FIXME: 一旦すべて許可しておく
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"*"},
	}))
	router.Static("/assets", "./assets")
	routers.InitRouter(router)

	// start server
	router.Run(":" + config.Server.Port)
}
