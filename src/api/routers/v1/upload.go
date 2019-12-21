package v1

import (
	"fmt"
	"log"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/laster18/1chan/src/api/config"
	"github.com/laster18/1chan/src/api/utils"
)

func UploadImage(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		log.Println("err: ", err)
		c.JSON(400, gin.H{"message": err.Error()})
		return
	}
	files := form.File["file"]
	if len(files) <= 0 {
		c.JSON(400, gin.H{"message": "file is required."})
		return
	}

	uuid, err := utils.GenUuid()
	if err != nil {
		c.JSON(500, gin.H{"message": "Server Error"})
	}

	// 1ファイルのみをアップロード
	file := files[0]

	// validation
	// file size
	if file.Size > config.Server.UploadMaxFileSize {
		log.Println("Too large file size: ", file.Size)
		c.JSON(413, gin.H{
			"status":  "Bad Request",
			"message": "Cannot upload image larger than 5MB",
		})
		return
	}
	// extension
	extensionPos := strings.LastIndex(file.Filename, ".")
	extension := file.Filename[extensionPos:]
	if extension != ".png" && extension != ".jpeg" && extension != ".jpg" {
		errMsg := fmt.Sprintf("%s file is not spported.", extension)
		log.Printf(errMsg)
		c.JSON(400, gin.H{"status": "Bad Request", "message": errMsg})
	}

	uploadFilePath := "assets/images/" + uuid + extension
	err = c.SaveUploadedFile(file, uploadFilePath)
	if err != nil {
		c.JSON(500, gin.H{"message": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"status":   "ok",
		"filePath": "http://" + c.Request.Host + "/" + uploadFilePath,
	})
}
