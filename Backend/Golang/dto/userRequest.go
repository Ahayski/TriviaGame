package dto

type CreateUserRequest struct {
	Name    string `json:"name" form:"name"`
	Email   string `json:"email" form:"email" validate:"required"`
	Diamond string `json:"diamond" form:"diamond"`
	Avatar  int    `json:"avatar" form:"avatar"`
}

type UpdateUserReques struct {
	Name    string `json:"name" form:"name"`
	Avatar  string `json:"avatar" form:"avatar"`
	Diamond int    `json:"diamond" form:"diamond"`
}

type LoginRequest struct {
	Email string `json:"email" form:"email" validate:"required"`
}
