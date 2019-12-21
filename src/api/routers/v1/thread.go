package v1

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"

	"github.com/laster18/1chan/src/api/db"
	"github.com/laster18/1chan/src/api/models"
)

// TODO: postのcountも返したい
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
	}

	// validation
	if json.Title == "" {
		c.JSON(400, gin.H{
			"status":  "Bad Request",
			"message": "title is required.",
		})
	}
	fmt.Printf("json.title: %v, json.description: %v", json.Title, json.Description)

	// insert thread
	db.Db.Create(&models.Thread{Title: json.Title, Description: json.Description})
	c.JSON(200, gin.H{
		"status": "ok",
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
	db.Db.Save(&thread)
	c.JSON(201, gin.H{
		"status": "ok",
		"thread": thread,
	})

}
