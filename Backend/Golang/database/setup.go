package database

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectiDatabase() {
	dsn := "host=monorail.proxy.rlwy.net user=postgres password=JabUsBDppVDpBnbByYFbpYAbzDTwmWEp dbname=GameKuis port=36213 sslmode=disable TimeZone=Asia/jakarta"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	fmt.Println("Database berhasil koneksi broour")

	DB = db
}
