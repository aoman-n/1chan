package config

import (
	"github.com/BurntSushi/toml"
)

type ConfigList struct {
	Server ServerConfig `toml:"server"`
	Db     DbConfig     `toml:"db"`
}

type ServerConfig struct {
	Port    string `toml:"port"`
	Logfile string `toml:"logfile"`
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
	if err != nil {
		panic(err)
	}
	Db = Config.Db
	Server = Config.Server
}
