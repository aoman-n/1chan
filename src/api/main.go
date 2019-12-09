package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/mysql"
)

type Product struct {
    gorm.Model
    Code  string
    Price uint
}

func main() {
	// TODO: DB情報を環境変数+configで管理する
	db, err := gorm.Open("mysql", "root:password@tcp(db:3306)/1chan?charset=utf8&parseTime=True&loc=Local")
    if err != nil {
        panic("failed to connect database")
    }
    defer db.Close()

    db.AutoMigrate(&Product{})


	r := gin.Default()
	fmt.Println("hoge")
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "ping",
		})
	})
	r.Run(":3001")
}
