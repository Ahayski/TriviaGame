package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// LoadEnv loads environment variables from .env file
func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
}

// GetEnv retrieves the value of the environment variable with the given key
func GetEnv(key string) string {
	return os.Getenv(key)
}