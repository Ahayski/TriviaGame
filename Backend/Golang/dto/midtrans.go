package dto

type MidtransRequest struct {
	Amount int64  `json:"amount" form:"amount" validate:"required"`
	ItemId string `json:"itemId" form:"itemId" validate:"required"`
}

type MidtransResponse struct {
	Token string `json:"token"`
	Url   string `json:"url"`
}
