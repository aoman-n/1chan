package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"time"

	"github.com/laster18/1chan/src/api/config"
	"github.com/laster18/1chan/src/api/db"
	"github.com/laster18/1chan/src/api/routers"
	"github.com/laster18/1chan/src/api/utils"
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
	r := gin.Default()
	routers.InitRouter(r)

	// start server
	r.Run(":" + config.Server.Port)
}
