package controllers

import (
	"github.com/Ahayski/TriviaGame/database"
	"github.com/Ahayski/TriviaGame/models"
	"github.com/gofiber/fiber/v2"
)

func AvatarUserFind(c *fiber.Ctx) error {
	var avatarUser []models.User_avatar
	err := database.DB.Preload("User").Preload("Avatar").Find(&avatarUser).Error

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not get user&avatar",
		})
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success get all user&avatar",
		"data":    avatarUser,
	})
}

func AvatarUserGetOnet(c *fiber.Ctx) error {
	id := c.Params("id")
	var avatarUser models.User_avatar
	err := database.DB.Preload("User").Preload("Avatar").Find(&avatarUser, id).Error

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(&fiber.Map{
			"message": "data not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success getuser&avatar",
		"data":    avatarUser,
	})
}
