package models

import "time"

type Quizzes struct {
	ID        int64     `json:"id" gorm:"primaryKey:autoIncrement"`
	Question  string    `json:"question gorm:"type:text"`
	Answer    string    `json:"answer gorm:"type:text"`
	Options   string    `json:options gorm:type:"json"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
