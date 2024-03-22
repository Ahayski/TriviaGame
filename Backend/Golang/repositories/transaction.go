package repositories

import (
	"log"

	"github.com/Ahayski/TriviaGame/database"
	"github.com/Ahayski/TriviaGame/models"
	"gorm.io/gorm"
)

type TransactionRepository interface {
	GetTransaction(OrderID string) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	GetUser(ID int64) (models.Users, error)
	UpdateUser(user models.Users) (models.Users, error)
	GetDiamonds(price int) (models.Diamond, error)
}

type transactionRepository struct {
	db *gorm.DB
}

func RepositoryTransaction(db *gorm.DB) *transactionRepository {
	return &transactionRepository{db}
}

func (r *transactionRepository) GetTransaction(OrderID string) (models.Transaction, error) {
	var orderId models.Transaction
	err := r.db.First(&orderId, "id = ?", OrderID).Error

	return orderId, err
}

func (r *transactionRepository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := database.DB.Create(&transaction).Error
	if err != nil {
		log.Fatal("failed to create transaction: ", err)
	}
	return transaction, err
}

func (r *transactionRepository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Debug().Save(&transaction).Error
	if err != nil {
		log.Fatal("failed to create transaction: ", err)
	}
	return transaction, err
}

func (r *transactionRepository) GetUser(ID int64) (models.Users, error) {
	var user models.Users
	err := r.db.Preload("PurchasedAvatars").First(&user, "id = ?", ID).Error

	return user, err
}

func (r *transactionRepository) UpdateUser(user models.Users) (models.Users, error) {
	err := r.db.Debug().Save(&user).Error

	return user, err
}

func (r *transactionRepository) GetDiamonds(price int) (models.Diamond, error) {
	var diamonds models.Diamond
	err := r.db.First(&diamonds, "price = ?", price).Error

	return diamonds, err
}
