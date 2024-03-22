package controllers

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"strconv"
	"time"

	"github.com/Ahayski/TriviaGame/database"
	"github.com/Ahayski/TriviaGame/dto"
	"github.com/Ahayski/TriviaGame/models"
	jwtToken "github.com/Ahayski/TriviaGame/pkg/jwt"
	fp "github.com/amonsat/fullname_parser"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
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

func UserGetOne(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.Users
	err := database.DB.Preload("PurchasedAvatars").First(&user, id).Error

	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not get user",
		})

		return err
	}

	responseData := map[string]interface{}{
		"id":               user.ID,
		"name":             user.Name,
		"email":            user.Email,
		"diamond":          user.Diamond,
		"avatar":           nil,
		"purchasedavatars": user.PurchasedAvatars,
	}

	for _, avatar := range user.PurchasedAvatars {
		avatarIDString := strconv.FormatInt(avatar.ID, 10)
		if avatarIDString == strconv.Itoa(user.Avatar) {
			avatarData := map[string]interface{}{
				"id":          avatar.ID,
				"avatarImage": avatar.AvatarImage,
			}
			responseData["avatar"] = avatarData
			break
		}
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success get user",
		"data":    responseData,
	})
}

func SignUp(c *fiber.Ctx) error {
	request := new(dto.CreateUserRequest)
	if err := c.BodyParser(request); err != nil {
		return err
	}

	var user models.Users

	err := database.DB.First(&user, "email = ?", request.Email).Error
	if err == nil {
		claims := jwt.MapClaims{}
		claims["id"] = user.ID
		claims["name"] = user.Name
		claims["email"] = user.Email
		claims["diamond"] = user.Diamond
		claims["avatar"] = user.Avatar

		token, errGenerateToken := jwtToken.GenerateToken(&claims)
		if errGenerateToken != nil {
			log.Println(errGenerateToken)
			fmt.Println("Unauthorize")
			return c.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"message": "Unauthorize",
			})
		}

		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"message": "success log in",
			"data":    user,
			"token":   token,
		})
	}

	validate := validator.New()
	errvalidate := validate.Struct(request)
	if errvalidate != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Validation failed",
			"error":   errvalidate.Error(),
		})
	}

	user = models.Users{
		Name:    request.Name,
		Email:   request.Email,
		Avatar:  request.Avatar,
		Diamond: 0,
	}

	err = database.DB.Create(&user).Error
	if err != nil {
		c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": "Failed to create user",
		})
		return err
	}

	// Buat token untuk pengguna baru
	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["name"] = user.Name
	claims["email"] = user.Email
	claims["diamond"] = user.Diamond
	claims["avatar"] = user.Avatar

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		fmt.Println("Unauthorize")
		return c.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
			"message": "Unauthorize",
		})
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"message": "success sign up",
		"data":    user,
		"token":   token,
	})
}

func UpdateUser(c *fiber.Ctx) error {
	var user models.Users

	userInfo := c.Locals("userInfo").(jwt.MapClaims)
	email := userInfo["email"].(string)

	err := database.DB.Preload("PurchasedAvatars").First(&user, "email = ?", email).Error
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"message": err.Error(),
		})
	}

	name := c.FormValue("name")
	avatar := c.FormValue("avatarId")

	if name != "" {
		user.Name = name
	}

	var selectedAvatar models.Avatars
	var found bool
	for _, av := range user.PurchasedAvatars {
		if strconv.Itoa(int(av.ID)) == avatar {
			selectedAvatar = av
			found = true
			break
		}
	}

	if !found {
		avatarID, err := strconv.Atoi(avatar)
		if err != nil {
			return err
		}

		var avatar models.Avatars
		if err := database.DB.First(&avatar, "id = ?", avatarID).Error; err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "Avatar not found",
			})
		}

		if avatar.Price == 0 {
			user.PurchasedAvatars = append(user.PurchasedAvatars, avatar)
			selectedAvatar = avatar
		} else {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"message": "You cannot select a paid avatar that you have not purchased.",
			})
		}
	}

	if avatar != "" {
		avatarIdInt, err := strconv.Atoi(avatar)
		if err != nil {
			// Handle the error if the conversion fails
			return err
		}
		if avatarIdInt != 0 {
			user.Avatar = int(selectedAvatar.ID)
		}
	}

	if err := database.DB.Save(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{
			"message": "Failed to update user",
		})
	}

	responseData := map[string]interface{}{
		"id":      user.ID,
		"name":    user.Name,
		"email":   user.Email,
		"diamond": user.Diamond,
		"avatar": map[string]interface{}{
			"id":          selectedAvatar.ID,
			"avatarImage": selectedAvatar.AvatarImage,
		},
	}

	return c.JSON(&fiber.Map{
		"message": "User updated successfully",
		"data":    responseData,
	})
}

func BuyDiamond(c *fiber.Ctx) error {
	var s snap.Client
	s.New(os.Getenv("MIDTRANS_SERVER_KEY"), midtrans.Sandbox)

	// s.New("SB-Mid-server-cLMUNyH2qGSidhoGBIJazXvL", midtrans.Sandbox)

	request := new(dto.MidtransRequest)

	if err := c.BodyParser(request); err != nil {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		return c.JSON(response)
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		return c.JSON(response)
	}

	userInfo := c.Locals("userInfo").(jwt.MapClaims)
	fmt.Println(userInfo["id"])

	// Konversi ke int64
	userIdFloat := userInfo["id"].(float64)
	userId := int64(userIdFloat)
	uName := userInfo["name"].(string)
	email := userInfo["email"].(string)

	parsedName := fp.ParseFullname(uName)
	firstName := parsedName.First
	lastName := parsedName.Last

	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.FormatInt(userId, 10) + "-" + time.Now().Format("240321154530"),
			GrossAmt: request.Amount,
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: firstName,
			LName: lastName,
			Email: email,
		},
		EnabledPayments: snap.AllSnapPaymentType,
	}

	resp, _ := s.CreateTransaction(req)
	// if err != nil {
	// 	response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
	// 	return c.JSON(response)
	// }

	midtransResponse := dto.MidtransResponse{
		Token: resp.Token,
		Url:   resp.RedirectURL,
	}

	response := dto.SuccessResult{Code: http.StatusOK, Data: midtransResponse}
	return c.JSON(response)

}
