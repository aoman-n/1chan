package apiV1

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func GetThreads(c *gin.Context) {
	fmt.Println("get threads!!!!")
	fmt.Println(c)

	c.JSON(200, gin.H{
		"threads": "hoge",
	})
}
