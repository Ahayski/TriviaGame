package main

import (
	"log"
	"os"

	"github.com/Ahayski/TriviaGame/database"
	"github.com/joho/godotenv"
	"github.com/midtrans/midtrans-go"

	// "github.com/Ahayski/TriviaGame/migrate"
	"github.com/Ahayski/TriviaGame/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	database.ConnectiDatabase()
	midtransConf()
	er := godotenv.Load()
	if er != nil {
		log.Fatal("Error loading .env file")
	}
	// migrate.RunMigrations()

	app := fiber.New()

	// Setup routes
	routes.SetupRoutes(app)

	err := app.Listen(":9000")
	if err != nil {
		panic(err)
	}
}

func midtransConf() {
	midtrans.ServerKey = os.Getenv("MIDTRANS_SERVER_KEY")
	midtrans.Environment = midtrans.Sandbox
}
