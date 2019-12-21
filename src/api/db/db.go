package db

import (
	"fmt"
	"github.com/jinzhu/gorm"

	"github.com/laster18/1chan/src/api/config"
)

var Db *gorm.DB

func getDbConnect() string {
	USER := config.Db.User
	PASSWORD := config.Db.Password
	PROTOCOL := fmt.Sprintf("tcp(db:%s)", config.Db.Port)
	DBNAME := config.Db.Name
	QUERY := "?charset=utf8&parseTime=True&loc=Local"
	CONNECT := USER + ":" + PASSWORD + "@" + PROTOCOL + "/" + DBNAME + QUERY

	return CONNECT
}

func gormConnect() (*gorm.DB, error) {
	DBMS := "mysql"
	CONNECT := getDbConnect()
	db, err := gorm.Open(DBMS, CONNECT)
	return db, err
}

func Setup() {
	var err error
	Db, err = gormConnect()
	if err != nil {
		panic("failed to connect database")
	}
}

func Close() {
	Db.Close()
}
