package apiV1

import (
	"fmt"

	"github.com/gin-gonic/gin"

	"github.com/laster18/1chan/src/api/db"
	"github.com/laster18/1chan/src/api/models"
)

func GetThreads(c *gin.Context) {

	var threads []models.Thread
	db.Db.Order("created_at desc").Find(&threads)

	fmt.Println("fetched threads: ", threads)

	c.JSON(200, gin.H{
		"threads": threads,
	})
}
