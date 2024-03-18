package models

import "time"

type Users struct {
	ID        int64     `json:"id" gorm:"primaryKey:autoIncrement"`
	Name      string    `json:"name"  gorm:"type:varchar(255)"`
	Email     string    `json:"email" gorm:"type:varchar(255)"`
	Diamond   int64     `json:"diamond" gorm:"type:number"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type UsersResponse struct {
	ID      int64  `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Diamond int64  `json:"diamond"`
}

func (UsersResponse) TableName() string {
	return "users"
}
