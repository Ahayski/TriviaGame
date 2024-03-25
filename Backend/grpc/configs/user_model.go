package configs

import (
	"time"
)

// User represents a user in the application
type User struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name,omitempty" validate:"required"`
	Email     string    `json:"email,omitempty" validate:"required"`
	Diamond   int64     `json:"diamond"`
	Avatar    int64     `json:"avatar,omitempty"`
	CreatedAt time.Time `json:"created_at,omitempty"`
	UpdatedAt time.Time `json:"updated_at,omitempty"`
}
