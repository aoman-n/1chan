package routers

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/laster18/1chan/src/api/routers/apiV1"
)

func sampleMiddleware(c *gin.Context) {
	fmt.Println("sample middleware!!!!! : before")
	c.Next()
	fmt.Println("sample middleware!!!!! : after")
}

func InitRouter(r *gin.Engine) {
	r.Use(sampleMiddleware)

	prefixV1 := r.Group("/api/v1")
	{
		prefixV1.GET("/hello", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "ping",
			})
		})
		prefixV1.GET("/threads", apiV1.GetThreads)
	}

}
