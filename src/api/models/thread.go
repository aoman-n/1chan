package models

type Thread struct {
	Id          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Posts       []Post `json:"posts"`
	Timestamp
}
