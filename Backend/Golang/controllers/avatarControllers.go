package controllers

import (
	"net/http"

	"github.com/Ahayski/TriviaGame/database"
	"github.com/Ahayski/TriviaGame/dto"
	"github.com/Ahayski/TriviaGame/models"
	"github.com/gofiber/fiber/v2"
	// "github.com/golang-jwt/jwt/v5"
)

func AvatarDiamondZero(c *fiber.Ctx) error {
	var avatar []models.Avatars

	// Mengambil semua avatar dengan nilai diamond 0 dari database
	err := database.DB.Where("price = ?", 0).Find(&avatar).Error
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not get avatars with diamond value 0",
		})
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success get avatars with diamond value 0",
		"data":    avatar,
	})
}
func AvatarGetAll(c *fiber.Ctx) error {
	var avatar []models.Avatars            // Inisialisasi sebagai slice Avatars
	err := database.DB.Find(&avatar).Error // Perhatikan penggunaan & untuk referensi slice avatar

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not get avatar",
		})
		return err
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success get all avatars",
		"data":    avatar,
	})
}

func AvatarGetOne(c *fiber.Ctx) error {
	id := c.Params("id")
	var avatar models.Avatars
	err := database.DB.Preload("PurchasedBy").First(&avatar, id).Error

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(&fiber.Map{
			"message": "avatar not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"status":  "succes",
		"message": "succes get avatar",
		"data":    avatar,
	})
}

func BuyAvatar(c *fiber.Ctx) error {
	var avatar models.Avatars
	var user models.Users
	avatarId := c.FormValue("avatarId")
	Email := c.FormValue("email")

	err := database.DB.First(&avatar, "id = ?", avatarId).Error
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(&fiber.Map{
			"messsage": err.Error(),
		})
	}

	//if using jwt
	// userInfo := c.Locals("userInfo").(jwt.MapClaims)
	// email := userInfo["email"].(string)

	userInfo := database.DB.First(&user, "email = ?", Email)
	if userInfo.Error != nil {
		return err
	}

	err = database.DB.Preload("PurchasedAvatars").First(&user, "email = ?", Email).Error
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	for _, v := range user.PurchasedAvatars {
		if v.ID == avatar.ID {
			c.Status(fiber.StatusBadRequest)
			response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Already purchased"}
			return c.JSON(&fiber.Map{
				"message": response,
			})
		}
	}

	if user.Diamond < avatar.Price {
		c.Status(fiber.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: "Not enough diamond"}
		return c.JSON(&fiber.Map{
			"message": response,
		})
	}

	user.Diamond -= avatar.Price

	user.PurchasedAvatars = append(user.PurchasedAvatars, models.Avatars{
		ID:          avatar.ID,
		AvatarImage: avatar.AvatarImage,
	})

	if err := database.DB.Save(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
			"message": "Failed to update user",
		})
	}

	return c.JSON(&fiber.Map{
		"message": "Avatar purchased successfully",
		"data":    user,
	})

}
