package models

type Post struct {
	Id       int    `json:"id"`
	ThreadId int    `json:"thread_id"`
	UserName string `json:"user_name"`
	Message  string `json:"message"`
	Timestamp
}
