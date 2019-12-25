package v1

import (
	"log"
	"mime/multipart"

	"github.com/gin-gonic/gin"
	"github.com/laster18/1chan/api/db"
	"github.com/laster18/1chan/api/models"
	"github.com/laster18/1chan/api/utils/uploader"
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

type CreatePostForm struct {
	UserName string                `form:"user_name"`
	Message  string                `form:"message" binding:"required"`
	Image    *multipart.FileHeader `form:"image"`
}

func CreatePost(c *gin.Context) {
	threadId := c.Param("id")

	// threadの存在チェック
	var thread models.Thread
	db.Db.First(&thread, threadId)
	if thread.Id == 0 {
		c.JSON(404, gin.H{
			"status":  "ng",
			"message": "thread not found.",
		})
		return
	}

	form := CreatePostForm{
		UserName: "名無しさん",
	}

	if err := c.ShouldBind(&form); err != nil {
		log.Println("ShouldBind Error: ", err)
		c.JSON(400, gin.H{
			"status":  "Bad Request",
			"message": err.Error(),
		})
		return
	}

	filePath, err := uploader.UploadImage(form.Image, c)
	if err != nil {
		log.Println("file upload error: ", err.Error())
		switch e := err.(type) {
		case *uploader.FileSizeError:
			log.Println("File Size Error: ", e.Msg)
			c.JSON(413, gin.H{
				"status":  "Bad Request",
				"message": "Cannot upload image larger than 5MB",
			})
			return
		case *uploader.NotSupportFiletypeError:
			log.Println("Not Support Filetype Error: ", e.Msg)
			c.JSON(400, gin.H{"status": "Bad Request", "message": e.Msg})
			return
		case *uploader.SaveError:
			log.Println("Image Save Error: ", e.Msg)
			c.JSON(500, gin.H{"status": "Bad Request", "message": err.Error()})
			return
		default:
			log.Println("Unexpected Error: ", e)
			c.JSON(500, gin.H{"status": "Unexpected Server Error"})
			return
		}
	}

	// Insert Post
	post := models.Post{
		UserName: form.UserName,
		Message:  form.Message,
		ThreadId: thread.Id,
		Image:    filePath,
	}
	db.Db.Create(&post)
	c.JSON(200, gin.H{
		"status": "ok",
		"post":   post,
	})
}
