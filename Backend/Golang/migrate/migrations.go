package migrate

import (
	"fmt"

	"github.com/Ahayski/TriviaGame/database"
	"github.com/Ahayski/TriviaGame/models"
)

func RunMigrations() {
	err := database.DB.AutoMigrate(&models.Users{}, &models.Avatars{})

	if err != nil {
		panic(err)
	}

	fmt.Println("Migration success broour")
}
