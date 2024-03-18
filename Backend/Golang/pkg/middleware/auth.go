// package middleware

// import (
// 	"context"
// 	"encoding/json"
// 	"net/http"
// 	"strings"

// 	"github.com/Ahayski/TriviaGame/dto"
// 	jwtToken "github.com/Ahayski/TriviaGame/pkg/jwt"
// )

// type Result struct {
// 	Code    int    `json:"code"`
// 	Data    int    `json:"data"`
// 	Message string `json:"message"`
// }

// func Auth(next http.HandlerFunc) http.HandlerFunc {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		w.Header().Set("Content-Type", "application/json")

// 		token := r.Header.Get("Authorization")

// 		if token == "" {
// 			w.WriteHeader(http.StatusUnauthorized)
// 			response := dto.ErrorResult{Code: http.StatusUnauthorized, Message: "unauthorized"}
// 			json.NewEncoder(w).Encode(response)
// 			return
// 		}

// 		token = strings.Split(token, " ")[1]
// 		claims, err := jwtToken.DecodeToken(token)

// 		if err != nil {
// 			w.WriteHeader(http.StatusUnauthorized)
// 			response := dto.ErrorResult{Code: http.StatusUnauthorized, Message: "unauthorized"}
// 			json.NewEncoder(w).Encode(response)
// 			return
// 		}

// 		ctx := context.WithValue(r.Context(), "userInfo", claims)
// 		r = r.WithContext(ctx)

// 		next.ServeHTTP(w, r)
// 	})
// }

package middleware

import (
	// "context"
	"strings"

	jwtToken "github.com/Ahayski/TriviaGame/pkg/jwt"
	"github.com/gofiber/fiber/v2"
)

func Auth(next fiber.Handler) fiber.Handler {
	return func(c *fiber.Ctx) error {
		token := c.Get("Authorization")

		if token == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Unauthorized",
			})
		}

		token = strings.Split(token, " ")[1]
		claims, err := jwtToken.DecodeToken(token)

		if err != nil {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Unauthorized",
			})
		}

		c.Locals("userInfo", claims)

		return next(c)
	}
}
