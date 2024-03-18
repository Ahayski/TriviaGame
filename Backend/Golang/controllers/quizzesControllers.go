package controllers

import (
	"github.com/Ahayski/TriviaGame/database"
	"github.com/Ahayski/TriviaGame/models"
	"github.com/gofiber/fiber/v2"
)

func QuizzesGetAll(c *fiber.Ctx) error {
	var quizzes []models.Quizzes
	err := database.DB.Find(&quizzes).Error

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not get quizzes",
		})
		return err
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success get all quizzes",
		"data":    quizzes,
	})
}

func QuizzesGetOne(c *fiber.Ctx) error {
	id := c.Params("id")
	var quizze models.Quizzes
	err := database.DB.First(&quizze, id).Error

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(&fiber.Map{
			"message": "data not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success get quizzes",
		"data":    quizze,
	})
}
