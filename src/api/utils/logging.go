package utils

import (
	"io"
	"os"

	"github.com/gin-gonic/gin"
)

func LoggingSettings(logFile string) {
	// logfile, _ := os.OpenFile(logFile, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	// multiLogFile := io.MultiWriter(os.Stdout, logfile)
	// log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	// log.SetOutput(multiLogFile)
	gin.DisableConsoleColor()

	// Logging to a file.
	f, _ := os.Create(logFile)
	gin.DefaultWriter = io.MultiWriter(f)
}
