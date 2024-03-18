package models

import "time"

type User_avatar struct {
	ID        int64          `json:"id" gorm:"primaryKey:autoIncrement"`
	User_id   int            `json:"-"`
	Avatar_id int            `json:"-"`
	User      UsersResponse  `json:"user" gorm:"foreignKey:User_id"`
	Avatar    AvatarResponse `json:"avatar" gorm:"foreignKey:Avatar_id"`
	CreatedAt time.Time      `json:"-"`
	UpdatedAt time.Time      `json:"-"`
}

func (User_avatar) TableName() string {
	return "user_avatar"
}
