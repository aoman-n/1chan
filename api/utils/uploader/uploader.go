package uploader

import (
	"fmt"
	"log"
	"mime/multipart"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/laster18/1chan/api/config"
	"github.com/laster18/1chan/api/utils"
)

type SaveError struct {
	Msg string
}

func (e *SaveError) Error() string {
	return "SaveError"
}

type NotSupportFiletypeError struct {
	Msg string
}

func (e *NotSupportFiletypeError) Error() string {
	return "NotSupportFiletypeError"
}

type FileSizeError struct {
	Msg string
}

func (e *FileSizeError) Error() string {
	return "FileSizeError"
}

func UploadImage(file *multipart.FileHeader, c *gin.Context) (string, error) {
	if file == nil {
		return "", nil
	}

	// file size validation
	if file.Size > config.Server.UploadMaxFileSize {
		log.Println("Too large file size: ", file.Size)
		return "", &FileSizeError{Msg: "Cannot upload image larger than 5MB"}
	}

	// file type validation
	extensionPos := strings.LastIndex(file.Filename, ".")
	extension := file.Filename[extensionPos:]
	if extension != ".png" && extension != ".jpeg" && extension != ".jpg" {
		errMsg := fmt.Sprintf("%s file is not spported.", extension)
		log.Printf(errMsg)
		return "", &NotSupportFiletypeError{Msg: errMsg}
	}

	uuid, _ := utils.GenUuid()

	uploadFilePath := "assets/images/" + uuid + extension
	err := c.SaveUploadedFile(file, uploadFilePath)
	if err != nil {
		return "", &SaveError{Msg: err.Error()}
	}

	return "http://" + c.Request.Host + "/" + uploadFilePath, nil
}
