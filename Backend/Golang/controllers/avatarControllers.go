package controllers

import (
	"github.com/Ahayski/TriviaGame/database"
	"github.com/Ahayski/TriviaGame/models"
	"github.com/gofiber/fiber/v2"
)

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
	err := database.DB.First(&avatar, id).Error

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
