package controllers

import (
	"github.com/Ahayski/TriviaGame/database"
	"github.com/Ahayski/TriviaGame/models"
	"github.com/gofiber/fiber/v2"
)

func DiamondGetAll(c *fiber.Ctx) error {
	var diamond []models.Diamond
	err := database.DB.Find(&diamond).Error

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not get diamond",
		})
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success get all diamons",
		"data":    diamond,
	})
}

func DiamondGetOne(c *fiber.Ctx) error {
	id := c.Params("id")
	var diamond models.Diamond
	err := database.DB.First(&diamond, id).Error

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(&fiber.Map{
			"message": "data not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success get diamons",
		"data":    diamond,
	})
}
