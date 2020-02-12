package config

import (
	"fmt"
	"os"

	"github.com/BurntSushi/toml"
)

type ConfigList struct {
	Server ServerConfig `toml:"server"`
	Db     DbConfig     `toml:"db"`
}

type ServerConfig struct {
	Port              string `toml:"port"`
	AccessLogfile     string `toml:"accessLogfile"`
	AppLogfile        string `toml:"appLogfile"`
	UploadMaxFileSize int64  `toml:"uploadMaxFileSize"`
}

type DbConfig struct {
	User     string `toml:"user"`
	Password string `toml:"password"`
	Port     string `toml:"port"`
	Name     string `toml:"name"`
}

var Config ConfigList
var Db DbConfig
var Server ServerConfig

func init() {
	_, err := toml.DecodeFile("config.toml", &Config)
	Db.Password = os.Getenv("DB_PASSWORD")
	Db.User = os.Getenv("DB_USER")
	Db.Port = os.Getenv("DB_PORT")
	Db.Name = os.Getenv("DB_NAME")
	pass := os.Getenv("DB_PASSWORD")
	fmt.Println("pass: ", pass)
	if err != nil {
		panic(err)
	}
	Db = Config.Db
	Server = Config.Server
}
