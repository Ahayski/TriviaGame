package models

import "time"

type Avatars struct {
	ID          int64     `json:"id" gorm:"primaryKey:autoIncrement"`
	AvatarImage string    `json:"avatarImage" gorm:"type:varchar(255);column:avatarImage"`
	Price       int       `json:"price" gorm:"type:int"`
	Purchase    bool      `json:"purchase" gorm:"type:boolean"`
	PurchasedBy []Users   `json:"purchasedby" gorm:"many2many:user_avatars"`
	CreatedAt   time.Time `json:"-"`
	UpdatedAt   time.Time `json:"-"`
}

type AvatarResponse struct {
	ID          int64  `json:"id"  gorm:"primaryKey;autoIncrement"`
	AvatarImage string `json:"avatarImage" gorm:"column:avatarImage"`
}

func (AvatarResponse) TableName() string {
	return "avatars"
}
