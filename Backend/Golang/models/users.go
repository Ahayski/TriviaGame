package models

import "time"

type Users struct {
	ID               int64     `json:"id" gorm:"primaryKey:autoIncrement"`
	Name             string    `json:"name"  gorm:"type:varchar(255)"`
	Email            string    `json:"email" gorm:"type:varchar(255)"`
	Diamond          int       `json:"diamond" gorm:"type:int"`
	Avatar           int       `json:"avatar" gorm:"type:int"`
	PurchasedAvatars []Avatars `json:"purchasedavatars" gorm:"many2many:user_avatars"`
	CreatedAt        time.Time `json:"-"`
	UpdatedAt        time.Time `json:"-"`
}

type UsersResponse struct {
	ID      int64  `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Diamond int64  `json:"diamond"`
	Avatar  int    `json:"avatar"`
}

func (UsersResponse) TableName() string {
	return "users"
}
