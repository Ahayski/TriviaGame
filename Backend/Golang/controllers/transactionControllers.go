package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/Ahayski/TriviaGame/dto"
	"github.com/Ahayski/TriviaGame/models"
	"github.com/Ahayski/TriviaGame/repositories"
	"github.com/gofiber/fiber/v2"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
)

type TransactionHandler struct {
	TransactionRepository repositories.TransactionRepository
}

func HandleTransaction(TransactionRepository repositories.TransactionRepository) *TransactionHandler {
	return &TransactionHandler{
		TransactionRepository,
	}
}

var s coreapi.Client

func (h *TransactionHandler) Notification(c *fiber.Ctx) error {
	// s.New("SB-Mid-server-cLMUNyH2qGSidhoGBIJazXvL", midtrans.Sandbox)

	s.New(os.Getenv("MIDTRANS_SERVER_KEY"), midtrans.Sandbox)
	var notificationPayload map[string]interface{}

	if err := c.BodyParser(&notificationPayload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"code":    http.StatusBadRequest,
			"message": err.Error(),
		})
	}

	orderId, exists := notificationPayload["order_id"].(string)
	if !exists {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "order id not found"}
		return c.JSON(response)
	}

	fmt.Print("ini payloadnya", notificationPayload)

	// 4. Check transaction to Midtrans with param orderId
	transactionStatusResp, e := s.CheckTransaction(orderId)
	if e != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": e.Error(),
		})
	} else {
		if transactionStatusResp != nil {
			if transactionStatusResp.TransactionStatus == "capture" {
				if transactionStatusResp.FraudStatus == "challenge" {
					// TODO set transaction status on your database to 'challenge'
					detail, err := h.TransactionRepository.GetTransaction(transactionStatusResp.OrderID)
					if err != nil {
						response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
						return c.Status(fiber.StatusBadRequest).JSON(response)
					}

					if transactionStatusResp.TransactionStatus != "" {
						detail.Status = "challenge"
						h.TransactionRepository.UpdateTransaction(detail)
					}
				} else if transactionStatusResp.FraudStatus == "accept" {
					// TODO set transaction status on your database to 'success'
					detail, err := h.TransactionRepository.GetTransaction(transactionStatusResp.OrderID)
					if err != nil {
						response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
						return c.Status(fiber.StatusBadRequest).JSON(response)
					}

					if transactionStatusResp.TransactionStatus != "" {
						detail.Status = "success"
						h.TransactionRepository.UpdateTransaction(detail)
					}

				}
			} else if transactionStatusResp.TransactionStatus == "settlement" {
				// TODO set transaction status on your databaase to 'success'
				detail, err := h.TransactionRepository.GetTransaction(transactionStatusResp.OrderID)
				if err != nil {
					response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
					return c.Status(fiber.StatusBadRequest).JSON(response)
				}

				if transactionStatusResp.TransactionStatus != "" {
					detail.Status = "success"
					h.TransactionRepository.UpdateTransaction(detail)
				}
			} else if transactionStatusResp.TransactionStatus == "deny" {

			} else if transactionStatusResp.TransactionStatus == "cancel" || transactionStatusResp.TransactionStatus == "expire" {
				detail, err := h.TransactionRepository.GetTransaction(transactionStatusResp.OrderID)
				if err != nil {
					response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
					return c.Status(fiber.StatusBadRequest).JSON(response)
				}

				if transactionStatusResp.TransactionStatus != "" {
					detail.Status = "failure"
					h.TransactionRepository.UpdateTransaction(detail)
				}
			} else if transactionStatusResp.TransactionStatus == "pending" {
				amount, err := strconv.ParseFloat(transactionStatusResp.GrossAmount, 64)
				if err != nil {
					response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
					return c.Status(fiber.StatusBadRequest).JSON(response)
				}

				transaction := models.Transaction{
					ID:     transactionStatusResp.OrderID,
					Amount: int(amount),
					Status: "pending",
				}

				data, err := h.TransactionRepository.CreateTransaction(transaction)
				if err != nil {
					response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
					return c.Status(fiber.StatusBadRequest).JSON(response)
				}

				c.Status(fiber.StatusOK)
				response := dto.SuccessResult{Code: http.StatusOK, Data: data}
				json.NewEncoder(c).Encode(response)
			}
		}

		c.Set("Content-Type", "application/json")
		c.SendString("ok")
	}

	// Let's move this block inside the if statement where transactionStatusResp is checked
	if transactionStatusResp != nil {
		transactions, err := h.TransactionRepository.GetTransaction(transactionStatusResp.OrderID)
		if err != nil {
			response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
			return c.Status(fiber.StatusBadRequest).JSON(response)
		}

		if transactions.Status == "success" {
			amount, err := strconv.ParseFloat(transactionStatusResp.GrossAmount, 64)
			if err != nil {
				response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
				return c.Status(fiber.StatusBadRequest).JSON(response)
			}

			strId := RemoveLastPart(transactionStatusResp.OrderID, "-")
			userId, err := strconv.ParseInt(strId, 10, 64)
			if err != nil {
				response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
				return c.Status(fiber.StatusBadRequest).JSON(response)
			}

			user, err := h.TransactionRepository.GetUser(userId)
			if err != nil {
				response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
				return c.Status(fiber.StatusBadRequest).JSON(response)
			}

			diamonds, err := h.TransactionRepository.GetDiamonds(int(amount))
			if err != nil {
				response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
				return c.Status(fiber.StatusBadRequest).JSON(response)
			}

			user.Diamond += diamonds.Amount

			h.TransactionRepository.UpdateUser(user)
		}
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"status": "success",
		"data":   notificationPayload,
	})
}

func RemoveLastPart(inputString, delimiter string) string {
	lastIndex := strings.LastIndex(inputString, delimiter)

	if lastIndex != -1 {
		resultString := inputString[:lastIndex]
		return resultString
	}
	return inputString
}
