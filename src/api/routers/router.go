package routers

import (
	"log"

	"github.com/gin-gonic/gin"
	v1 "github.com/laster18/1chan/src/api/routers/v1"
)

func printReqCtxMiddleware(c *gin.Context) {
	log.Printf("request path: %s", c.Request.URL.Path)
	// log.Println("request postForm: %v", c.PostForm)
	c.Next()
}

func InitRouter(r *gin.Engine) {
	r.Use(printReqCtxMiddleware)

	prefixV1 := r.Group("/api/v1")
	{
		prefixV1.GET("/threads", v1.GetThreads)
		prefixV1.POST("/threads", v1.CraeteThread)
	}

}
