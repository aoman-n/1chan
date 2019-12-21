package routers

import (
	"log"

	"github.com/gin-gonic/gin"
	v1 "github.com/laster18/1chan/src/api/routers/v1"
)

func printReqCtxMiddleware(c *gin.Context) {
	log.Printf("Reaquest method: %s, path: %s", c.Request.Method, c.Request.URL.Path)
	c.Next()
}

func InitRouter(r *gin.Engine) {
	r.Use(printReqCtxMiddleware)

	prefixV1 := r.Group("/api/v1")
	{
		// thread API
		prefixV1.GET("/threads", v1.GetThreads)
		prefixV1.POST("/threads", v1.CraeteThread)
		prefixV1.PATCH("/threads/:id", v1.UpdateThread)
		prefixV1.GET("/threads/:id", v1.GetThread)

		// post API
		prefixV1.GET("/threads/:id/posts", v1.GetPosts)
		prefixV1.POST("/threads/:id/posts", v1.CreatePost)
	}

}
