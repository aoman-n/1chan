package v1

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/laster18/1chan/api/db"
	"github.com/laster18/1chan/api/models"
)

// threadの詳細(posts付き)
func GetThread(c *gin.Context) {
	threadId := c.Param("id")

	var thread models.Thread
	db.Db.Find(&thread, threadId).Related(&thread.Posts)

	c.JSON(200, gin.H{
		"thread": thread,
	})
}

// TODO: postのcountも返したい
// FIXME: post: nullで返却されるのでこのフィールドを消して返したい
func GetThreads(c *gin.Context) {

	var threads []models.Thread
	db.Db.Order("created_at desc").Find(&threads)

	fmt.Println("fetched threads: ", threads)

	c.JSON(200, gin.H{
		"threads": threads,
	})
}

type ThreadParams struct {
	Title       string `form:"title" json:"title"`
	Description string `form:"description" json:"description"`
}

func CraeteThread(c *gin.Context) {
	// json parse
	var json ThreadParams
	if err := c.ShouldBindJSON(&json); err != nil {
		log.Println("shouldBindJSON error: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Bad Request",
		})
		return
	}

	// validation
	if json.Title == "" {
		c.JSON(400, gin.H{
			"status":  "Bad Request",
			"message": "title is required.",
		})
		return
	}
	fmt.Printf("json.title: %v, json.description: %v", json.Title, json.Description)

	thread := models.Thread{Title: json.Title, Description: json.Description}
	// insert thread
	if err := db.Db.Create(&thread).Error; err != nil {
		log.Println("db create failed. error: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Creation of thread failed",
		})
		return
	}

	c.JSON(200, gin.H{
		"status": "ok",
		"thread": thread,
	})
}

func UpdateThread(c *gin.Context) {
	id := c.Param("id")
	log.Println("id: ", id)

	var thread models.Thread
	db.Db.First(&thread, id)
	log.Println("target thread: ", thread)

	// json parse
	var json ThreadParams
	if err := c.ShouldBindJSON(&json); err != nil {
		log.Println("shouldBindJSON error: ", err)
	}

	// validation
	if json.Title == "" {
		c.JSON(400, gin.H{
			"status":  "Bad Request",
			"message": "title is required.",
		})
	}

	// update thread data
	thread.Title = json.Title
	if thread.Description != "" {
		thread.Description = json.Description
	}

	if err := db.Db.Save(&thread); err != nil {
		log.Printf("thread %v, save error: %v", thread, err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "thread update error",
		})
	}

	c.JSON(201, gin.H{
		"status": "ok",
		"thread": thread,
	})

}
