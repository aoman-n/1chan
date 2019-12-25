package utils

import (
	"io"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/laster18/1chan/api/config"

)

/*
	MEMO: applicationのログとginのアクセスログを別ファイルで出力
	同じファイルへの出力方法がわからないので一旦。。
*/
func InitLogging() {
	// application logging
	logfile, _ := os.OpenFile(config.Server.AppLogfile, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	multiLogFile := io.MultiWriter(os.Stdout, logfile)
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	log.SetOutput(multiLogFile)

	// gin logging
	gin.DisableConsoleColor()
	f, _ := os.OpenFile(config.Server.AccessLogfile, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	gin.DefaultWriter = io.MultiWriter(f)
}
