package models

import "time"

type Diamond struct {
	ID        int64     `json:"id" gorm:"primaryKey:autoIncrement"`
	Image     string    `json:"image" gorm:"type:varchar(255)"`
	Amount    int       `json:"amount" gorm:"type:integer"`
	Price     int64     `json:"price" gorm:"type:integer"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
