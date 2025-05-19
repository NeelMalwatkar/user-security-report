package services

import (
	"encoding/csv"
	"os"
	"strings"
	"time"

	"backend/models"
)

func parseDate(s string) (time.Time, error) {
	layout := "Jan 2 2006"
	return time.Parse(layout, s)
}

func LoadUsersFromCSV(path string) ([]models.User, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		return nil, err
	}

	var users []models.User
	now := time.Now()

	for i, record := range records {
		if i == 0 {
			continue // header
		}
		pcTime, err := parseDate(record[2])
		if err != nil {
			return nil, err
		}
		laTime, err := parseDate(record[3])
		if err != nil {
			return nil, err
		}

		users = append(users, models.User{
			Name:                    record[0],
			CreateDate:              record[1],
			PasswordChangedDate:     record[2],
			LastAccessDate:          record[3],
			MFAEnabled:              strings.ToLower(record[4]) == "true",
			DaysSincePasswordChange: int(now.Sub(pcTime).Hours() / 24),
			DaysSinceLastAccess:     int(now.Sub(laTime).Hours() / 24),
		})
	}
	return users, nil
}
