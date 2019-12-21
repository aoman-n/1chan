package main

import (
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/mysql"

	"github.com/laster18/1chan/src/api/config"
	"github.com/laster18/1chan/src/api/db"
	"github.com/laster18/1chan/src/api/routers"
	"github.com/laster18/1chan/src/api/utils"
)

func main() {
	// setup logger
	utils.InitLogging()

	// setup DB
	db.Setup()
	defer db.Close()

	// setup gin
	gin.SetMode("debug")
	r := gin.Default()
	routers.InitRouter(r)

	// start server
	r.Run(":" + config.Server.Port)
}
