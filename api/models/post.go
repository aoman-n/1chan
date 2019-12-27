package models

type Post struct {
	Id       int    `json:"id"`
	ThreadId int    `json:"threadId"`
	UserName string `json:"userName"`
	Message  string `json:"message"`
	Image    string `json:"image"`
	Timestamp
}
