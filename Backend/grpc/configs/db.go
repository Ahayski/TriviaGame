package configs

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

type dbHandler interface {
	UpdateUser(id int64, user User) (int64, error)
}

type DB struct {
	db *sql.DB
}

func NewDBHandler() dbHandler {
	connStr := EnvPostgresURI()
	if connStr == "" {
		panic("EnvPostgresURI is null")
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(fmt.Sprintf("error opening database connection: %v", err))
	}

	err = db.Ping()
	if err != nil {
		panic(fmt.Sprintf("error pinging database: %v", err))
	}

	fmt.Println("Connected to PostgreSQL")

	return &DB{db: db}
}

func (db *DB) UpdateUser(id int64, user User) (int64, error) {
	if db == nil {
		return 0, fmt.Errorf("db is null")
	}

	var currentDiamond int64
	err := db.db.QueryRow("SELECT diamond FROM users WHERE id = $1", id).Scan(&currentDiamond)
	if err != nil {
		return 0, fmt.Errorf("failed to retrieve current diamond value: %w", err)
	}

	newDiamond := currentDiamond + 1

	query := `
        UPDATE users
        SET diamond = $1
        WHERE id = $2
    `

	result, err := db.db.Exec(query, newDiamond, id)
	if err != nil {
		return 0, fmt.Errorf("failed to update user: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return 0, fmt.Errorf("failed to get rows affected: %w", err)
	}

	return rowsAffected, nil
}

// EnvPostgresURI mengembalikan URI koneksi ke PostgreSQL dari variabel lingkungan
func EnvPostgresURI() string {
	return os.Getenv("POSTGRES_URI")
}
