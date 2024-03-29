package routes

import (
	"github.com/Ahayski/TriviaGame/controllers"
	"github.com/Ahayski/TriviaGame/database"
	"github.com/Ahayski/TriviaGame/pkg/middleware"
	"github.com/Ahayski/TriviaGame/repositories"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	//avatar
	app.Get("/api/avatars", controllers.AvatarGetAll)
	app.Get("/api/avatar/:id", controllers.AvatarGetOne)
	app.Get("/api/avatars_zero", controllers.AvatarDiamondZero)

	//quizzes
	app.Get("/api/quizzes", controllers.QuizzesGetAll)
	app.Get("/api/quizzes/:id", controllers.QuizzesGetOne)

	//users
	app.Get("/api/users", controllers.UserGetAll)
	app.Get("/api/user/:id", controllers.UserGetOne)
	app.Post("/api/user/signup", controllers.SignUp)
	// app.Post("/api/user/login", controllers.Login)
	// app.Patch("/api/updateAvatar", middleware.Auth(controllers.UpdateAvatar))
	app.Patch("/api/user", middleware.Auth(controllers.UpdateUser))
	// app.Patch("/api/buyAvatar", middleware.Auth(controllers.BuyAvatar))
	app.Patch("/api/buyAvatar", controllers.BuyAvatar)

	//user&avatar
	app.Get("/api/avatar-user", controllers.AvatarUserFind)
	app.Get("/api/avatar-user/:id", controllers.AvatarUserGetOnet)

	//diamond
	app.Get("/api/diamonds", controllers.DiamondGetAll)
	app.Get("/api/diamond/:id", controllers.DiamondGetOne)
	// app.Post("/api/buyDiamond", middleware.Auth(controllers.BuyDiamond))
	app.Post("/api/buyDiamond", controllers.BuyDiamond)

	//transactions
	transactionRepository := repositories.RepositoryTransaction(database.DB)
	h := controllers.HandleTransaction(transactionRepository)
	app.Post("/notification", h.Notification)

}
