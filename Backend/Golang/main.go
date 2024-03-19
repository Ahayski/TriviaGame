package main

import (
	"github.com/Ahayski/TriviaGame/database"
	// "github.com/Ahayski/TriviaGame/migrate"
	"github.com/Ahayski/TriviaGame/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	database.ConnectiDatabase()
	// migrate.RunMigrations()

	app := fiber.New()

	// Setup routes
	routes.SetupRoutes(app)

	err := app.Listen(":9000")
	if err != nil {
		panic(err)
	}
}
