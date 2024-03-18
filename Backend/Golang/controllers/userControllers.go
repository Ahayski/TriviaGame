package controllers

import (
	"fmt"
	"log"
	"strconv"

	"github.com/Ahayski/TriviaGame/database"
	"github.com/Ahayski/TriviaGame/dto"
	"github.com/Ahayski/TriviaGame/models"
	jwtToken "github.com/Ahayski/TriviaGame/pkg/jwt"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func UserGetAll(c *fiber.Ctx) error {
	var users []models.Users
	err := database.DB.Find(&users).Error

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not get users",
		})

		return err
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success get all users",
		"data":    users,
	})
}

func SignUp(c *fiber.Ctx) error {
	request := new(dto.CreateUserRequest)
	if err := c.BodyParser(request); err != nil {
		return err
	}

	//validasi
	validate := validator.New()
	errvalidate := validate.Struct(request)
	if errvalidate != nil {
		return errvalidate
	}

	user := models.Users{
		Name:    request.Name,
		Email:   request.Email,
		Diamond: 0,
	}

	err := database.DB.Create(&user).Error

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "failed create user",
		})
		return err
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success signup",
		"data":    user,
	})

}

func Login(c *fiber.Ctx) error {
	request := new(dto.LoginRequest)
	if err := c.BodyParser(request); err != nil {
		return err
	}

	//validasi
	validate := validator.New()
	errvalidate := validate.Struct(request)
	if errvalidate != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "failed",
			"error":   errvalidate.Error(),
		})
		// return errvalidate
	}

	user := models.Users{
		Email: request.Email,
	}
	err := database.DB.First(&user, "email = ?", request.Email).Error
	if err != nil {
		c.Status(fiber.StatusNotFound).JSON(&fiber.Map{
			"message": "user not found",
		})
		return err
	}

	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["name"] = user.Name
	claims["email"] = user.Email
	claims["diamond"] = user.Diamond

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		fmt.Println("Unauthorize")
		return c.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
			"message": "Unauthorize",
		})
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success login",
		"token":   token,
	})

}

func UserGetOne(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.Users
	err := database.DB.First(&user, id).Error

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not get user",
		})

		return err
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success get all user",
		"data":    user,
	})
}

func UpdateUser(c *fiber.Ctx) error {
	var user models.Users

	userInfo := c.Locals("userInfo").(jwt.MapClaims)
	email := userInfo["email"].(string)

	err := database.DB.First(&user, "email = ?", email).Error
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	name := c.FormValue("name")
	diamond := c.FormValue("diamond")

	if name != "" {
		user.Name = name
	}

	if diamond != "" {
		diamondValue, err := strconv.ParseInt(diamond, 10, 64)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "Invalid diamond value",
			})
		}
		user.Diamond = diamondValue
	}

	if err := database.DB.Save(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
			"message": "Failed to update user",
		})
	}

	token, err := jwtToken.GenerateToken(userInfo)
	if err != nil {
		log.Println(err)
		return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
			"message": "Failed to generate token",
		})
	}

	fmt.Println("Token:", token)

	return c.JSON(&fiber.Map{
		"message": "User updated successfully",
		"data":    user,
	})
}
