package v1

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/laster18/1chan/src/api/db"
	"github.com/laster18/1chan/src/api/models"
)

func GetPosts(c *gin.Context) {
	threadId := c.Param("id")
	log.Println(threadId)

	// fetch posts on threadId
	var posts []models.Post
	db.Db.Where("thread_id = ?", threadId).Find(&posts)

	c.JSON(200, gin.H{
		"status": "ok",
		"posts":  posts,
	})
}

type PostParams struct {
	UserName string `form:"user_name" json:"user_name"`
	Message  string `form:"message" json:"message"`
}

func CreatePost(c *gin.Context) {
	threadId := c.Param("id")

	// threadが存在するか確認
	var thread models.Thread
	db.Db.First(&thread, threadId)
	if thread.Id == 0 {
		c.JSON(404, gin.H{
			"status":  "ng",
			"message": "thread not found.",
		})
		return
	}

	// json parse
	var json PostParams
	if err := c.ShouldBindJSON(&json); err != nil {
		log.Println("shouldBindJSON error: ", err)
		c.JSON(400, gin.H{
			"status":  "Bad Request",
			"message": "undefined data or not support data type.",
		})
		return
	}

	// post parametersのバリデーション
	if json.Message == "" {
		c.JSON(400, gin.H{
			"status":  "Bad Request",
			"message": "message is required.",
		})
		return
	}

	userName := json.UserName
	if userName == "" {
		userName = "Mr. NoName"
	}

	// insert post
	post := models.Post{
		UserName: userName,
		Message:  json.Message,
		ThreadId: thread.Id,
	}
	db.Db.Create(&post)
	c.JSON(200, gin.H{
		"status": "ok",
		"post":   post,
	})
}
